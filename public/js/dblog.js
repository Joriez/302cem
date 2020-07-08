var check_username = "";
$.ajax({
    url: "http://localhost:3000/username",
    type: "GET",
    dataType: "jsonp",
    success: function (data) {
        console.log(data.username)
        if (data.username != '') {
            $("#username").text(data.username.username)
            check_username = data.username.username;
        } else {
            $("#fail").text("Email or password incorrect")
            console.log("login fail")
        }
    }
})
var id = $("#blog_id").val()
$.ajax({
    url: "http://localhost:3000/item/" + id,
    type: "GET",
    dataType: "jsonp",
    success: function (data) {
        console.log(check_username)
        console.log(data)
        $("#title").text(data.item.ProductTitle)
        $("#description").text(data.item.Productdescription)
        $("#created_by").text("Created by: " + data.item.Username)
        
        //(check_username == data.item.Username) ? $("#delete").show() : $("#delete").hide();
        if(check_username == data.item.Username){
            $("#delete").show()
            $("#modify").show()
        }else{
            $("#delete").hide()
            $("#modify").hide()
        }
        
        $("#image").append(
           '<div class="item">' +
         '<img src="/static/uploads/' + data.item.ProductImage + '" alt="">' +
               '<a class="ps-product__zoom single-image-popup" href="/static/uploads/' + data.item.ProductImage  + '">' +
                   '<i class="exist-zoom"></i>'+
                   '</a></div>'
        )
    }
})
//$("#delete").hide();

$("#change_item").click(function() {
    var title_1 = $("#title_1").val();
    var description_1 = $("#description_1").val();
    var data = { item_id: id, description: description_1, title: title_1};
    fetch("http://localhost:3000/item", {
        method: 'put', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => window.location.href = "/blog");
})


$("#delete").click(function () {
    var data = { item_id: id };
    fetch("http://localhost:3000/item", {
        method: 'delete', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => window.location.href = "/blog");
})

