 $(document).ready(function(){
     $('#login').on('click', function() { // This event fires when a button is clicked
        $("#login_user_name").removeClass("error");
        $("#login_password").removeClass("error");

        var button = $(this).val();
        jQuery.support.cors = true;
        var user_name=$("#login_user_name").val();
        if(!validateEmail(user_name)){
            $("#login_user_name").addClass("error");
            $("#login_user_name").val(user_name+" is not a valid email");
            return;
        }
        var password=$("#login_password").val();
        if(!user_name || !password){
            $("#login_user_name").addClass("error");
            $("#login_password").addClass("error");
            return;
        }
      
        var jsonData = {};
        jsonData['user_name']=user_name;
        jsonData['password']=password;

        var jsonPostData=JSON.stringify(jsonData);
        var post_url='http://localhost:9000/user/login';
        $.ajax(
            { 
              type: 'POST', 
              url: post_url, 
              data: jsonPostData, 
              contentType: "application/json; charset=utf-8",
              dataType: 'json', 
              success: function( data ){
                //$.ready(); 
                var status=data['status'];
                if(status=="USR_DOES_NOT_EXIST"){
                    $("#login_user_name").addClass("error");
                    $("#login_user_name").val(user_name+" does not exists");

                }
                else if(status=="AUTHENTICATION_FAILED"){
                    $("#login_password").addClass("error");
                    $("#login_password").val("Wrong password");
                }
                else if(status=="SUCCESS"){
                    var auth=data['auth'];
                    createCookie("opinion_user_name",user_name,1);
                    createCookie("opinion_auth",auth,1);
                    //alert(readCookie("opinion_user_name"));
                    //alert(readCookie("opinion_auth"));
                    window.location.href = "http://localhost/opinion/index.html";
                }
                else{

                }
              }
              
            }
        );
        return false; // keeps the page from not refreshing 
      });

$('body').on('keypress', '#login_password', function(e){
     var p = e.which;
     if(p==13){
        jQuery.support.cors = true;
        var user_name=$("#login_user_name").val();
        if(!validateEmail(user_name)){
            $("#login_user_name").addClass("error");
            $("#login_user_name").val(user_name+" is not a valid email");
            return;
        }
        var password=$("#login_password").val();
        if(!user_name || !password){
            return;
        }
      
        var jsonData = {};
        jsonData['user_name']=user_name;
        jsonData['password']=password;

        var jsonPostData=JSON.stringify(jsonData);
        var post_url='http://localhost:9000/user/login';
        $.ajax(
            { 
              type: 'POST', 
              url: post_url, 
              data: jsonPostData, 
              contentType: "application/json; charset=utf-8",
              dataType: 'json', 
              success: function( data ){
                //$.ready(); 
                var status=data['status'];
                if(status=="USR_DOES_NOT_EXIST"){
                    $("#login_user_name").addClass("error");
                    $("#login_user_name").val(user_name+" does not exists");

                }
                else if(status=="AUTHENTICATION_FAILED"){
                    $("#login_password").addClass("error");
                }
                else if(status=="SUCCESS"){
                    var auth=data['auth'];
                    createCookie("opinion_user_name",user_name,1);
                    createCookie("opinion_auth",auth,1);
                    //alert(readCookie("opinion_user_name"));
                    //alert(readCookie("opinion_auth"));
                    window.location.href = "http://localhost/opinion/index.html";

                }
                
              }
              
            }
        );
        return false; 
     }
});


//sign up
$('#sign_up').on('click', function() { // This event fires when a button is clicked
        var button = $(this).val();
        jQuery.support.cors = true;
        var full_name=$("#register_user_name").val();
        var user_name=$("#register_email_id").val();
        if(!validateEmail(user_name)){
            $("#register_email_id").addClass("error");
            $("#register_email_id").val(user_name+" is not a valid email");
            return;
        }
        var password=$("#register_password").val();
        if(!user_name || !password){
            return;
        }
       
        var jsonData = {};
        jsonData['full_name']=full_name;
        jsonData['user_name']=user_name;
        jsonData['password']=password;

        var jsonPostData=JSON.stringify(jsonData);
        var post_url='http://localhost:9000/user/add';
        $.ajax(
            { 
              type: 'POST', 
              url: post_url, 
              data: jsonPostData, 
              contentType: "application/json; charset=utf-8",
              dataType: 'json', 
              success: function( data ){
                var status=data['status'];
                if(status=='ALREADY_EXISTS'){
                    $("#register_email_id").addClass("error");
                    $("#register_email_id").val(user_name+" allready exists");
                }
                else if(status=='OK'){
                    alert('User added');
                }
                
              }
              
            }
        );
        return false; // keeps the page from not refreshing 
      });

});



function validateEmail(mail){  
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
      {  
        return (true)  
      }  
        return (false)  
}  