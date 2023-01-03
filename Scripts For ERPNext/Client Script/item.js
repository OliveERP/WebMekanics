// Create a new Client Script as:
// Doctype: Item
// Apply To: Form
// Enabled: Click this checkbox
// Script: Paste the following code in Script section and SAVE the document

frappe.ui.form.on('Item', {
	refresh(frm) {
      cur_frm.add_custom_button(__('Upload Image'), () => {
          frappe.prompt({
                label: 'Drive URL',
                fieldname: 'drive_url',
                fieldtype: 'Text'
            }, (value) => {
                frappe.call({
                    method: "volods.volods.functions.get_image_url",
                    args:{
                        drive_url: value.drive_url
            		},
            		callback:function(r){
            		    if(r.message ){
            		        console.log(r.message);
            		        cur_frm.set_value('image', r.message);
            		        frappe.db.insert({
                                "doctype":"File",
                                "file_name":"Image for Item " + frm.doc.name,
                                "file_url":r.message,
                                "attached_to_doctype":'Item',
                                "attached_to_name":frm.doc.name
                            }).then(function(doc) {
                                 frappe.show_alert({
				    message:__('Image Added Successfuly!'),
				    indicator:'green'
				}, 5);
                                 
                                });
            		        frm.save();
            		    }
            		}
            	});
                
            });
	    }).addClass('btn-primary');
   } 
})
