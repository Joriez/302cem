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
        setTimeout(function (){
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
        })
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

// $.ajax({
//     url: "http://localhost:3000/comment/" + id,
//     type: "GET",
//     dataType: "jsonp",
//     success: function (data) {
//         console.log(data)
//         for(var i = 0; i < data.item.length; i++){
//             $("#comment_area").append(
             
//                 '<div class="panel panel-default">' +
//                 '<div class="panel-heading">' +
//                 '<strong>' + data.item[i].Username + '</strong>' +
//                 ( check_username  == data.item[i].Username ?
//                     '<div>' +
//                     '<div class="row">' +
//                     '<div class="col-sm">' +
//                     '</div>' +
//                     '<div class="col-sm">' +
//                     '</div>' +
//                     '<div class="col-sm">' +
//                     '<form onsubmit="setTimeout(function () { window.location.reload(); }, 10)" method="post" action="http://localhost:3000/comment/{{id}}?_method=DELETE">' +
//                     '<input type="hidden" name="_method" value="' + data.item[i]._id + '">' + 
//                     '<button type="button" class="btn btn-outline-warning" data-toggle="modal" data-target="#ModalCenter' + i + '">Edit</button>' +
//                     '<button type="submit" onClick="location.reload()" class="btn btn-outline-danger" id="Delete_Comment' + i + '"' + '>' + '<img src="../static/css/images/cross.png"></img>'  + '</button>' +
//                     '</form>' +
//                     '</div>'  +
//                   '</div>' +
//                  '</div>': "" ) +
//                 '</div>' +
//                 '<div class="panel-body">' +
//                 data.item[i].Comment +
//                 '</div>'+
//                 '</div>' +
    
    
    
    
//                 '<div class="modal fade" id="ModalCenter'+ i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
//                 '<div class="modal-dialog modal-dialog-centered" role="document">' +
//                 '<div class="modal-content">' +
//                 '<div class="modal-header">' +
//                 '<h5 class="modal-title" id="exampleModalCenterTitle">Modify Your Choosing Commnet</h5>' +
//                 '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
//                 '<span aria-hidden="true">&times;</span>' +
//                 '</button>' +
//                 '</div>' +
//                 '<form onsubmit="setTimeout(function () { window.location.reload(); }, 10)" method="POST" action="http://localhost:3000/comment/{{id}}?_method=PUT">' +
//                 '<div class="modal-body">' +
//                 '<input type="hidden" name="selected_id" value=' + data.item[i]._id + '>' +
//                 '<input type="text" class="form-control" name="change_comment" required>'+
//                 '</div>' +
//                 '<div class="modal-footer">' +
//                 '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
//                 '<button type="submit" class="btn btn-primary">Save changes</button>' +
//                 '</div>' +
//                 '</form>'+
//                 '</div>' +
//                 '</div>'
    
//             )
//         }

//     }
// })


$.ajax({
	url: "http://localhost:3000/comment/" + id,
	type: "GET",
	dataType: "jsonp",
	success: function (data) {
		var check = $("#CheckPermission").val()
		for (i = 0; i < data.item.length; i++) {
		console.log(data.item[i])
		$("#comment_area").append(
			// data[i].Comment + '<br>'
			'<div class="panel panel-default">' +
            '<div class="panel-heading">' +
			'<strong>' + data.item[i].Username + '</strong>' +
			( check_username == data.item[i].Username ?
				'<div>' +
				'<div class="row">' +
				'<div class="col-sm">' +
				'</div>' +
				'<div class="col-sm">' +
				'</div>' +
				'<div class="col-sm">' +
				'<form onsubmit="setTimeout(function () { window.location.reload(); }, 10)" method="post" action="http://localhost:3000/comment/{{id}}?_method=DELETE">' +
				'<input type="hidden" name="method" value="' + data.item[i]._id + '">' + 
				'<button type="button" class="btn btn-outline-warning" data-toggle="modal" data-target="#ModalCenter' + i + '">Edit</button>' +
				'<button type="submit" onClick="location.reload()" class="btn btn-outline-danger" id="Delete_Comment' + i + '"' + '>' + '<img src="../static/css/images/cross.png"></img>'  + '</button>' +
				'</form>' +
				'</div>'  +
			  '</div>' +
			 '</div>': "" ) +
            '</div>' +
            '<div class="panel-body">' +
            data.item[i].Comment +
            '</div>'+
			'</div>' +




			'<div class="modal fade" id="ModalCenter'+ i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
			'<div class="modal-dialog modal-dialog-centered" role="document">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<h5 class="modal-title" id="exampleModalCenterTitle">Modify Your Choosing Commnet</h5>' +
			'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
			'<span aria-hidden="true">&times;</span>' +
			'</button>' +
			'</div>' +
			'<form onsubmit="setTimeout(function () { window.location.reload(); }, 10)" method="POST" action="http://localhost:3000/comment/{{id}}?_method=PUT">' +
			'<div class="modal-body">' +
			'<input type="hidden" name="selected_id" value=' + data.item[i]._id + '>' +
			'<input type="text" class="form-control" name="change_comment" required>'+
			'</div>' +
			'<div class="modal-footer">' +
			'<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
			'<button type="submit" class="btn btn-primary">Save changes</button>' +
			'</div>' +
			'</form>'+
			'</div>' +
			'</div>'


		)

		}
		
	}
})