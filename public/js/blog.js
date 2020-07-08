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




$.ajax({
    url: "http://localhost:3000/item",
    type: "GET",
    dataType: "jsonp",
    success: function (data) {
        console.log(data.item.length)
        for(var i = 0; i < data.item.length; i ++){
            $("#item").append(
            
                '<article class="ps-post--horizontal">' + 
                '<div class="ps-post__thumbnail"><a class="ps-post__overlay" href="#"></a><img src="/static/uploads/'+ data.item[i].ProductImage + '" alt="">' +
                    '<div class="ps-post__posted"><span class="date">17</span><span class="month">Oct</span></div>' +
                '</div>' +
                
                '<div class="ps-post__content">' +
                    '<h4 class="ps-post__title"><a href="#">'+ data.item[i].ProductTitle + '</a></h4>' +
                    '<form action="http://localhost:3000/dblog" method="POST"> ' +
                    '<input type="hidden" value="' + data.item[i]._id + '"' + ' name = "product_id" >' + 
                    
                    '<p>' + data.item[i].Productdescription + '</p><button type="submit" class="ps-btn--underline ps-post__morelink" href="/dblog">Read more</button>'+
                    '</form>' +
                '</div>'+
            '</article>'

                )
        }


    }
})