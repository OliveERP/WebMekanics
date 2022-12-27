# Server Script Code
# Create the Server Script with the following data:
# Name: Get Last Sales Rate
# Script Type: API
# API Method: get_last_sales_rate
# Script: Paste the following code in script section and SAVE the document

customer = frappe.form_dict.customer
item_code = frappe.form_dict.item_code
so = frappe.form_dict.so
condition = ""
if so:
    condition = " and name!='"+so+"' "

res = frappe.db.sql(""" select rate from `tabSales Order Item` where item_code=%s and parent in 
( select name from `tabSales Order` where customer=%s and docstatus=1 """+condition + """) 
order by creation DESC limit 1""", (item_code, customer), as_dict=1)
frappe.response["message"] = res
