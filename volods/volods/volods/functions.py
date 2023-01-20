from xml.dom.minidom import Document
import frappe
import base64

from frappe.model.mapper import get_mapped_doc


@frappe.whitelist()
def item_search(doctype, txt, searchfield, start, page_len, filters, as_dict=False):
    conditions = []

    # Get searchfields from meta and use in Item Link field query
    meta = frappe.get_meta("Item", cached=True)
    searchfields = meta.get_search_fields()

    if "description" in searchfields:
        searchfields.remove("description")

    columns = ''
    extra_searchfields = [field for field in searchfields
                          if not field in ["name", "item_group", "description"]]

    if extra_searchfields:
        columns = ", " + ", ".join(extra_searchfields)

    searchfields = searchfields + [field for field in [searchfield or "name", "item_code", "item_group", "item_name"]
                                   if not field in searchfields]
    searchfields = " or ".join(
        [field + " like %(txt)s" for field in searchfields])

    description_cond = ''
    if frappe.db.count('Item', cache=True) < 50000:
        # scan description only if items are less than 50000
        description_cond = 'or tabItem.description LIKE %(txt)s'

    return frappe.db.sql("""select tabItem.name,
        concat("<img src='",tabItem.image,"' width='31px'>"),
		if(length(tabItem.item_name) > 40,
			concat(substr(tabItem.item_name, 1, 40), "..."), item_name) as item_name,
		tabItem.item_group,
		if(length(tabItem.description) > 40, \
			concat(substr(tabItem.description, 1, 40), "..."), description) as description
		{columns}
		from tabItem
		where tabItem.docstatus < 2
			and tabItem.has_variants=0
			and tabItem.disabled=0
			and (tabItem.end_of_life > %(today)s or ifnull(tabItem.end_of_life, '0000-00-00')='0000-00-00')
			and ({scond} or tabItem.item_code IN (select parent from `tabItem Barcode` where barcode LIKE %(txt)s)
				{description_cond})
            or (tabItem.item_code IN (select parent from `tabItem Supplier` where supplier_part_no LIKE %(txt)s))
			{fcond} {mcond}
		order by
			if(locate(%(_txt)s, name), locate(%(_txt)s, name), 99999),
			if(locate(%(_txt)s, item_name), locate(%(_txt)s, item_name), 99999),
			idx desc,
			name, item_name
		limit %(start)s, %(page_len)s """.format(
        key=searchfield,
        columns=columns,
        scond=searchfields,
        fcond=get_filters_cond(
            doctype, filters, conditions).replace('%', '%%'),
        mcond=get_match_cond(doctype).replace('%', '%%'),
        description_cond=description_cond),
        {
        "today": nowdate(),
        "txt": "%%%s%%" % txt,
        "_txt": txt.replace("%", ""),
        "start": start,
        "page_len": page_len
    }, as_dict=as_dict)


@frappe.whitelist()
def get_all_invoices(source_name, target_doc=None):
    def update_item(obj, target, source_parent):
        target.qty = -1 * obj.qty
        target.stock_qty = -1 * obj.qty
        target.amount = -1 * obj.amount
        target.base_amount = -1 * obj.base_amount
        target.net_amount = -1 * obj.net_amount
        target.base_net_amount = -1 * obj.base_net_amount
        target.sales_invoice_no = obj.parent

    doc = get_mapped_doc("Sales Invoice", source_name,	{
        "Sales Invoice": {
            "doctype": "Sales Invoice",
            "field_map": {
                "name": "sales_invoice",
                "customer": "customer"
            },
            "validation": {
                "docstatus": ["=", 1],
            }
        },
        "Sales Invoice Item": {
            "doctype": "Sales Invoice Item",
            "field_map": {
                "name": "sales_invoice_item",
                "parent": "sales_invoice",
            },
            "postprocess": update_item,
            # "condition": lambda doc: abs(doc.received_qty) < abs(doc.qty + (doc.qty*((frappe.db.get_value("Item", {"name": doc.item_code}, "over_delivery_receipt_allowance")/100) or (frappe.db.get_single_value("Stock Settings", "over_delivery_receipt_allowance")/100)) or 0)) and doc.delivered_by_supplier != 1
        },
    }, target_doc)
    qty = 0.0
    total = 0.0
    for val in doc.items:
        qty = qty + val.qty
        total = total + val.amount

    doc.total_qty = -1 * qty
    doc.total = -1 * total

    return doc


@frappe.whitelist()
def get_image_url(drive_url):
    data_bytes64 = base64.b64encode(bytes(drive_url, 'utf-8'))
    data_bytes64_String = data_bytes64.decode(
        'utf-8').replace('/', '_').replace('+', '-').rstrip("=")
    resultUrl = f"https://api.onedrive.com/v1.0/shares/u!{data_bytes64_String}/root/content"
    return resultUrl
