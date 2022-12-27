// Create a new Client Script as:
// Doctype: Sales Order
// Apply To: Form
// Enabled: Click this checkbox
// Script: Paste the following code in Script section and SAVE the document

cur_frm.cscript.refresh = function (frm) {

    cur_frm.set_query("item_code", "items", function () {
        return {
            query: "volods.volods.item_query.item_search",
            filters: { 'is_sales_item': 1 }
        };
    });
}
cur_frm.cscript.onload = function (frm) {

    cur_frm.set_query("item_code", "items", function () {
        return {
            query: "volods.volods.item_query.item_search",
            filters: { 'is_sales_item': 1 }
        };
    });
}


// frappe.ui.form.on('Sales Order', {
//   refresh(frm) {
//       if (frm.doc.docstatus === 0) {


//     		cur_frm.add_custom_button(__('Create Pick List'), () => {
//               frappe.model.open_mapped_doc({
//         			method: "erpnext.selling.doctype.sales_order.sales_order.create_pick_list",
//         			frm: frm
// 		        });
//     	    }).addClass('btn-primary');
// 		}
//   } 
// });

frappe.ui.form.on('Sales Order Item', {
    refresh(frm) {
        // your code here
    },

    item_code(frm, cdt, cdn) {
        var row = locals[cdt][cdn];

        frappe.call({
            api: "/api/method",
            method: "get_last_sales_rate",
            args: {
                customer: frm.doc.customer,
                item_code: row.item_code,
                so: null ? frm.doc.__islocal : frm.doc.name
            },
            callback: function (r) {
                if (r.message) {
                    console.log(r.message);
                    row.rate = r.message[0].rate
                    setInterval(function () { row.rate = r.message[0].rate; cur_frm.refresh_field("items") }, 500);
                    setInterval(function () { row.rate = r.message[0].rate; cur_frm.refresh_field("items") }, 1000);
                    setInterval(function () { row.rate = r.message[0].rate; cur_frm.refresh_field("items") }, 2000);
                }
            }
        });

        frappe.model.with_doc("Item", row.item_code, function () {
            var file = frappe.model.get_doc("Item", row.item_code);
            row.image_view_html = repl('<img src="%(imgurl)s" width="31px">', { imgurl: file.image });
            if (!file) {
                row.image_view_html = repl('<img src="%(imgurl)s" width="31px">', { imgurl: row.image });
            }
            //frm.refresh_field('items');

        });

    }
})