
$.ajax({
    url: "http://localhost:3000/username",
    type: "GET",
    dataType: "jsonp",
    success: function (data) {
        console.log(data);
        if (data.username == '') {
            console.log("stay");
            window.location.href = '/';
        } else {
            
            console.log('return');
            $("#username").text(data.username.username);
            $("#username_data").val(data.username.username);
        }
    }
})


$("form#data").submit(function(e) {
    e.preventDefault();    
    var formData = new FormData(this);
    
    $.ajax({
        url: "http://localhost:3000/item",
        type: 'POST',
        data: formData,
        complete:
        setTimeout(function() {
            window.location.href = '/blog'
        },100),
        cache: false,
        contentType: false,
        processData: false
    });
    
});



$("#logout").click(function(){
    console.log("logout");
    window.location.href = '/';

})