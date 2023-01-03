// Create a new Client Script as:
// Doctype: Quotation
// Apply To: Form
// Enabled: Click this checkbox
// Script: Paste the following code in Script section and SAVE the document

erpnext.selling.ItemListCustom = erpnext.selling.QuotationController.extend({
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


frappe.ui.form.on('Quotation Item', {
	refresh(frm) {
		// your code here
	},
	item_code(frm,cdt,cdn) {
	    var row = locals[cdt][cdn];
    	frappe.model.with_doc("Item", row.item_code, function() {
	        var file = frappe.model.get_doc("Item", row.item_code);
            row.image_view_html = repl('<img src="%(imgurl)s" width="31px">', {imgurl: file.image});
            if (!file){
                 row.image_view_html = repl('<img src="%(imgurl)s" width="31px">', {imgurl: row.image});
            }
            //frm.refresh_field('items');
    	        
    	   });
	}
})


$.extend(cur_frm.cscript, new erpnext.selling.ItemListCustom({frm: cur_frm}));
