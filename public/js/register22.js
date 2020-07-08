$("#submit").click(function(){
    
    var email = $("#email").val();
    var username = $("#name").val();
    var password = $("#password").val();
    var conpassword = $("#Conpassword").val();

    $.ajax({
        url: "http://localhost:3000/",
        data: { email: email, username: username, password:password, passwordConf:conpassword },
        type: "POST",
        dataType: "application/jsonp",
        success: window.location.href = '/login'
        // ,complete: 
        // setTimeout(function() {
        //     $.ajax({
        //         url: hostname + "username",
        //         type: "GET",
        //         dataType: "jsonp",
        //         success: function (data) {
        //             if ( data.username != ""){
        //                 window.location.href = '/main';
        //             } else {
        //                 $("#fail").text("Fail Register")
        //                 console.log("login fail")
        //             }
        //         }
        //     })
            
        //   }, 100),
        
        

    });
})