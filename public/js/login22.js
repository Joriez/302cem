$("#send").click(function(){
    var email = $("#username").val();
    var password = $("#password").val();
    $.ajax({
        url: "http://localhost:3000/",
        data: { logemail: email, logpassword: password },
        type: "POST",
        dataType: "application/jsonp",
        success:  
            setTimeout(function(){
                $.ajax({
                    url: "http://localhost:3000/username",
                    type: "GET",
                    dataType: "jsonp",
                    success: function (data) {
                        console.log(data.username)
                        if (data.username != '') {
                            window.location.href = '/memberindex';
                        } else {
                            $("#fail").text("Email or password incorrect")
                            console.log("login fail")
                        }
                    }
                })
            },1000)

        
        

    });
})