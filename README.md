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


With that the ap will be installed on the ERPNext instance
