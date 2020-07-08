var check_username = "";
$.ajax({
    url: "http://localhost:3000/username",
    type: "GET",
    dataType: "jsonp",
    success: function (data) {
        //console.log(data.username)
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
        //console.log(check_username)
        //console.log(data)
        $("#title").text(data.item.ProductTitle)
        $("#description").text(data.item.Productdescription)
        $("#created_by").text("Created by: " + data.item.Username)

        //(check_username == data.item.Username) ? $("#delete").show() : $("#delete").hide();
        if (check_username == data.item.Username) {
            $("#delete").show()
            $("#modify").show()
        } else {
            $("#delete").hide()
            $("#modify").hide()
        }

        $("#image").append(
            '<div class="item">' +
            '<img src="/static/uploads/' + data.item.ProductImage + '" alt="">' +
            '<a class="ps-product__zoom single-image-popup" href="/static/uploads/' + data.item.ProductImage + '">' +
            '<i class="exist-zoom"></i>' +
            '</a></div>'
        )
    }
})
//$("#delete").hide();

$("#change_item").click(function () {
    var title_1 = $("#title_1").val();
    var description_1 = $("#description_1").val();
    var data = { item_id: id, description: description_1, title: title_1 };
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


$("#postComment").click(function () {
    var comment = $("#comment").val();
    var username = $("#username").text();
    var ProductID = $("#blog_id").val();
    $.ajax({
        url: "http://localhost:3000/comment",
        data: {
            "ProductID": ProductID,
            "Comment": comment,
            "Username": username
        },
        method: "POST",
        success: function () {
            location.reload(); 
        }
    });
});

$.ajax({
    url: "http://localhost:3000/comment/" + id,
    type: "GET",
    dataType: "jsonp",
    success: function (data) {
        console.log(data)
        for(var i = 0; i < data.item.length; i++){
            $("#comment_area").append(
                '<form' +
                '<div class="ps-product__content">'+
                '<div class="ps-container-fluid">'+
                    '<ul class="tab-list" role="tablist">'+
                     
                        '<li><a href="#tab_02" aria-controls="tab_02" role="tab" data-toggle="tab">'+ data.item[i].Username +'</a></li>'+
                    '</ul>'+
                    '<div class="tab-content">'+
                        '<div class="tab-pane active" role="tabpanel">'+
                            '<div class="ps-content">'+
                                
                                '<p>'+ data.item[i].Comment +'</p>'+
                            '</div>'+
                        '</div>' +
                        '</form>' +
                        '<br>' + '<br>' + '<br>'
            )
        }

    }
})

