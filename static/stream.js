$("document").ready(function () {
    var targetContainer = $('#output');
    var eventSource = new EventSource("/api/stream");
    eventSource.onmessage = (function (e) {
        targetContainer.append(e.data.replace('\\n', '<br/>'));
        $('html, body').scrollTop($(document).height());
        console.log(e);
    });
});
