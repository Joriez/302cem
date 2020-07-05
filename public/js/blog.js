$.ajax({
    url: "http://localhost:3000/username",
    type: "GET",
    dataType: "jsonp",
    success: function (data) {
        console.log(data.username)
        if (data.username != '') {
            $("#username").text(data.username.username)
        } else {
            $("#fail").text("Email or password incorrect")
            console.log("login fail")
        }
    }
})