"use strict";
var map;
var polylines = [];
var sessions = [];

$("document").ready(function () {
    // load sessions
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
                    loadGPXFileIntoGoogleMap(map, session.session_id);
                }
            })
        }
    });
});