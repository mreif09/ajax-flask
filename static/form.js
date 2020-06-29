$("document").ready(function () {
    $("#send").click(function () {
        var message = $("#message").val();
        $.ajax({
            url: "http://localhost:5000/api/form",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ "message": message })
        }).done(function (data) {
            console.log(data);
            $('#output').text(data.message);
        });
    });
});
