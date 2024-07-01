//Get User Id and password by js
$(document).ready(function() {
    $('[type=submit]').click(function () {
        var userId = $('#login').val();
        var password = $('#password').val();
        console.log('User ID: ' + userId);
        console.log('User Password: ' + password);

        var requestData = JSON.stringify({ userId: userId, password: password });
        console.log('Request Data:', requestData);
        debugger;

        // Send AJAX request to the Odoo controller
        $.ajax({
            type: "POST",
            url: "/blog_redirect/controller/custom.py/action_redirect2",  // Change this URL according to your Odoo configuration
            data: requestData,
            contentType: "application/json",
            dataType: "json",
            success: function(response) {
                console.log(response.message);
            }
        });
    });
});
