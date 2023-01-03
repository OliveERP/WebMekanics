# Custom App Download Procedure

1A) The App can be forked into your own repository. In this case, you can name the repository and folders of your choice. You can, then, download that code and proceed.

1B) Other way is to download the repoistory and change the name of folder(volods) as per your requirement

2. After the code is downloaded. You need to paste the app folder into your ERPNext code at the similar level of ERPNEXT
   Please refer to the screenshot below:
   ![image](https://user-images.githubusercontent.com/120718232/209635139-2984ca67-0d4d-422f-ae38-5f1e2e3c7be6.png)
   
   
   As you can see in the screenshot attached, the custom app (volods) and erpnext app are on the same hierarchy/level. You can create this by clicking on the button pointed by the red arrow

3. Now, you need to create this app in your ERPNext instance. For that, you connect with the server through ssh or putty. Go to its bench folder and type the
following command which will create a new app on the instance.
         <h4>$ bench new-app {your custom_app name here}</h4>
  
  Fill in the rest of the information and your custom-app is created.
  ![image](https://user-images.githubusercontent.com/120718232/209636780-004527ab-fa7d-4bdd-8432-f7db28beebd1.png)






  
4. Next, you have to install the app on site. For that, type the following command:
         <h4>$ bench --site {your site name here} install-app {your custom_app name here}</h4>
         ![image](https://user-images.githubusercontent.com/120718232/209637128-9bd9966e-3754-4de0-9c0e-3671a14a9535.png)



5. Check the installed app through this command
         <h4>$ bench --site {your site name} list-apps</h4>
         

6. Run the following commands:
         <h4>$ bench migrate</h4>
         <h4>$ bench restart</h4>
         
         or you can use supervisorctl as well. Both will do the trick


With that the app will be installed on the ERPNext instance


# Adding Image Snapshot in Listview Procedure
This customization is required in any doctype where image snapshot is to be shown in listview. Currently, this behavior has to be duplicated in following doctypes:
1. Material Request
2. Purchase Order
3. Request for Quotation
4. Quotation
5. Supplier Quotation
6. Purchase Receipt
7. Purchase Invoice
8. Sales Order
9. Pick List
10. Delivery Note
11. Sales Invoice

Following steps have to be followed:
1. Go to Customize form of the doctype. Click on three dots(Menu) and click "Customize".
![image](https://user-images.githubusercontent.com/120718232/210155429-d8a52bfe-b776-4e73-9627-5b414e26de11.png)

2. A customize form will open. Click on "Customize Child Table" and select its item table at top. By default, its the document name follows by the word 'Item'. For instance, if the selected doctype is 'Supplier Quotation', then, its item table is 'Supplier Quotation Item'.
![image](https://user-images.githubusercontent.com/120718232/210155438-281f97d1-70a9-45ec-a187-2931b130bb13.png)

3. Create a new field with label as 'image_view_html', and type as 'Long Text'. Select 'In List View' and 'Read Only' checkboxes.
![image](https://user-images.githubusercontent.com/120718232/210155480-997f03f2-0161-4dad-ae8c-b0cb1e742548.png)
![image](https://user-images.githubusercontent.com/120718232/210155486-7a92bce3-d745-4502-b2a3-95c8fd053c0f.png)

4. Click on 'Update' to save the changes.
5. Once the form is updated, change the label to any desired name. For now, its 'Image Preview'
![image](https://user-images.githubusercontent.com/120718232/210155522-69998103-2ce9-42b6-bcb7-cc344524f645.png)

6. Click on 'Update' to save and update the form.

For reference, please refer to this video tutorial: 
https://drive.google.com/file/d/1XR3vbgZ2U89kJHd0sKOUp0uDZ5vE6MWp/view?usp=share_link

# Adding 'Sales Invoice No.' column in Sales Invoice Item
1. Go to Customize for of Sales Invoice by clicking on three dots and then 'Customize'.
2. Click on 'Customize Child Table' and select 'Sales Invoice Item'.
3. Create a new field after row 90 with label 'sales_invoice_no', type 'Link'. Select 'In List View' and 'Read Only' checkboxes. In Option, type 'Sales Invoice'
![image](https://user-images.githubusercontent.com/120718232/210156304-c4261f20-180b-4238-b928-7930bcc3d99b.png)

4. Click 'Update'.
5. Once the field is created, change the label to "Sales Invoice No.".
6. Click 'Update' to save the changes. Refresh the system to ensure the changes.

# Upload Image from One drive
1. Upload the image in the one drive and get its share link.
2. In respective Item from, click on the button "Upload Image" and paste the one drive link.
3. The image will be uploaded.
4. Please refer to this video demonstration of the process: https://drive.google.com/file/d/1uCVPkcgdqKeY2vlmv1LLMFIqOjAF0gq_/view?usp=share_link
