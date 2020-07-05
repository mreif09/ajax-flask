"use strict";
var sessions = [];

$("document").ready(function () {
    $.ajax({
        url: "/api/sessions",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            data.forEach(element => {
                sessions.push(new Session(element));
            })

            sessions.sort(function (a, b) {
                return b.start_time - a.start_time;
            })

            sessions.forEach(session => {
                $('#output').append(`
                <p class="session" id="${session.session_id}">
                    <span class="start_time">${session.start_time.toLocaleString()}</span>
                    <span class="end_time">${session.end_time.toLocaleString()}</span>
                    <span class="duration">${session.duration.toISOString().substr(11, 8)}</span>
                    <span class="distance">${session.distance}m</span>
                    <span class="sport_type">${session.sport_type}</span>
                </p>`);

                document.getElementById(session.session_id).onclick = function () {
                    drawHeartRateFigure(session.session_id);
                }
            });

            drawHeartRateFigure(sessions[0].session_id);
        }
    });
});

function drawHeartRateFigure(id) {
    $.ajax({
        url: "/api/heart_rate/" + id,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            var x = [];
            var y = [];
            data.forEach(element => {
                x.push(new Date(element.timestamp));
                y.push(element.heart_rate);
            })
            Plotly.newPlot('plotly', [{
                x: x,
                y: y,
                mode: 'lines+markers',
                text: 'bpm',
                line: { shape: 'spline', color: 'rgb(255, 0, 0)' },
                type: 'scatter'
            }], {
                'xaxis': {
                    // tickformat: "%H:%M:%S",
                    type: 'date'
                }
            });
        },
        error: function () {
            // nothing todo
        }
    });
}
