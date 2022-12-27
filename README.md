# Custom App Download Procedure

1A. The App can be forked into your own repository. In this case, you can name the repository and folders of your choice. You can, then, download that code and proceed.

1B. Other way is to download the repoistory and change the name of folder(volods) as per your requirement

2. After the code is downloaded. You need to paste the app folder into your ERPNext code at the similar level of ERPNEXT
   Please refer to the screenshot below:
   ![image](https://user-images.githubusercontent.com/120718232/209635139-2984ca67-0d4d-422f-ae38-5f1e2e3c7be6.png)
   As you can see in the screenshot attached, the custom app (volods) and erpnext app are on the same hierarchy/level.

3. Now, you need to create this app in your ERPNext instance. For that, you connect with the server through ssh or putty. Go to its bench folder and type the
following command which will create a new app on the instance.

  <h3>$ bench new-app library_management</h3>


