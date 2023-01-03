// Create a new Client Script as:
// Doctype: Sales Order
// Apply To: Form
// Enabled: Click this checkbox
// Script: Paste the following code in Script section and SAVE the document

erpnext.selling.ItemListCustom = erpnext.selling.SalesOrderController.extend({
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


    

frappe.ui.form.on('Sales Order Item', {
	refresh(frm) {
		// your code here
	},
	
	item_code(frm,cdt,cdn) {
	    var row = locals[cdt][cdn];
	   
	    frappe.call({
            api:"/api/method",
            method: "get_last_sales_rate",
            args:{
                customer: frm.doc.customer,
                item_code:row.item_code,
                so:null?frm.doc.__islocal:frm.doc.name
    		},
    		callback:function(r){
    		    if(r.message ){
    		        console.log(r.message);
    		       row.rate = r.message[0].rate
    		      setTimeout(function () {row.rate = r.message[0].rate ; cur_frm.refresh_field("items")}, 500);
    		      setTimeout(function () {row.rate = r.message[0].rate  ; cur_frm.refresh_field("items")}, 1000);
    		      setTimeout(function () {row.rate = r.message[0].rate  ; cur_frm.refresh_field("items")}, 2000);
    		    }
    		}
    	});
	    
	    frappe.model.with_doc("Item", row.item_code, function() {
	        var file = frappe.model.get_doc("Item", row.item_code);
            row.image_view_html = repl('<img src="%(imgurl)s" width="31px">', {imgurl: file.image});
            frm.refresh_field("image_view_html", cdn, "items");
            /*if (!file){
                 row.image_view_html = repl('<img src="%(imgurl)s" width="31px">', {imgurl: row.image});
            }*/
            //frm.refresh_field('items');
	        
	    });
	   
	    
	},

});

$.extend(cur_frm.cscript, new erpnext.selling.ItemListCustom({frm: cur_frm}));

