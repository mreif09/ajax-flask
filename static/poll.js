var offset = 0;
var timeout = 100;

$("document").ready(function () {
    setTimeout(updateMessages, timeout);
});

function updateMessages () {
    $.ajax({
        url: "http://localhost:5000/api/poll",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ "offset": offset })
    }).done(function (data) {
        offset = offset + data.length;
        console.log(data);
        $('#output').append('<p>' + data + '</p>');
        $('html, body').scrollTop($(document).height());
    });

    setTimeout(updateMessages, timeout);
  }
