import json
from collections import defaultdict

import frappe
from frappe import scrub
from frappe.desk.reportview import get_filters_cond, get_match_cond
from frappe.utils import nowdate, unique

import erpnext
from erpnext.stock.get_item_details import _get_item_tax_template


# @frappe.whitelist()
# def msg(doctype, method):
#     frappe.msgprint("Here!!")


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
