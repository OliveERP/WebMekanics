// Create a new Client Script as:
// Doctype: Sales Invoice
// Apply To: Form
// Enabled: Click this checkbox
// Script: Paste the following code in Script section and SAVE the document


erpnext.selling.ItemListCustom = erpnext.selling.SalesInvoiceController.extend({
    setup_queries:function(doc, dt, dn){
       this._super();
      if(this.frm.fields_dict["items"].grid.get_field('item_code')) {
			this.frm.set_query("item_code", "items", function() {
				return {
					query: "volods.volods.item_query.item_search",
					filters: {'is_sales_item': 1}
				}
			});
		}
       
    },
   
}) 

frappe.ui.form.on('Sales Invoice', {
       refresh:function(frm){
         if(cur_frm.doc.docstatus != 1 && cur_frm.doc.docstatus != 2) {
		    cur_frm.add_custom_button(__("Sales Return"), function() {
		        cur_frm.doc.is_return = 1;
		        cur_frm.doc.update_stock = 1;
		        erpnext.utils.map_current_doc({
		            method: "volods.volods.functions.get_all_invoices",
		            source_doctype: "Sales Invoice",
		            target: cur_frm,
		            setters: {
		                customer: cur_frm.doc.customer || undefined,
		            },
		            get_query_filters: {
		                docstatus: 1,
		                status: ["not in", ["Draft", "Return", "Credit Note Issued", "Unpaid", "Cancelled", "Internal Transfer", "Unpaid and Discounted"]],
		                company: cur_frm.doc.company
		            }
		        });
		    });
		}
       }
    })
   


frappe.ui.form.on('Sales Invoice Item', {
	refresh(frm) {
		// your code here
	},
	item_code(frm,cdt,cdn) {
	    var row = locals[cdt][cdn];
    	frappe.model.with_doc("Item", row.item_code, function() {
	        var file = frappe.model.get_doc("Item", row.item_code);
            row.image_view_html = repl('<img src="%(imgurl)s" width="31px">', {imgurl: file.image});
            // if (!file){
            //      row.image_view_html = repl('<img src="%(imgurl)s" width="31px">', {imgurl: row.image});
            // }
            //frm.refresh_field('items');
    	        
    	   });
	}
});

$.extend(cur_frm.cscript, new erpnext.selling.ItemListCustom({frm: cur_frm}));
