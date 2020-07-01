var map;
var polylines = [];
var sessions = [];

$("document").ready(function () {
    // load sessions
    $.ajax({
        url: "http://localhost:5000/api/sessions",
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

                document.getElementById(session.session_id).onmouseover = function () {
                    loadGPXFileIntoGoogleMap(map, session.session_id);
                }
            })
        }
    });
});

function loadGPXFileIntoGoogleMap(map, id) {
    for (var i = 0; i < polylines.length; i++) {
        polylines[i].setMap(null);
    }

    $.ajax({
        url: "http://localhost:5000/api/gpx/" + id,
        type: "GET",
        dataType: "xml",
        success: function (data) {
            var parser = new GPXParser(data, map);

            parser.setTrackColour("#ff0000");     // Set the track line colour
            parser.setTrackWidth(5);          // Set the track line width
            parser.setMinTrackPointDelta(0.001);      // Set the minimum distance between track points
            parser.centerAndZoom(data);
            parser.addTrackpointsToMap();         // Add the trackpoints
            // parser.addRoutepointsToMap();         // Add the routepoints
            // parser.addWaypointsToMap();           // Add the waypoints

            polylines = parser.polylines;
        },
        error: function () {
            polylines = [];
        }
    });
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: home_position,
        zoom: 14,
        mapTypeId: 'satellite'
    });

    var marker = new google.maps.Marker({
        position: home_position,
        map: map,
        title: 'Home!'
    });

    // load a map
    // var mapOptions = {
    //     zoom: 8,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   };
    // map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // $.ajax({
    //     url: "http://localhost:5000/api/gpx/0aabf975-d791-4baa-b444-fe1f02d0b600",
    //     type: "GET",
    //     dataType: "xml",
    // }).done(function (data) {
    //     console.log(data);
    //     var parser = new GPXParser(data, map);
    //     parser.setTrackColour("#ff0000");     // Set the track line colour
    //     parser.setTrackWidth(5);          // Set the track line width
    //     parser.setMinTrackPointDelta(0.001);      // Set the minimum distance between track points
    //     parser.centerAndZoom(data);
    //     parser.addTrackpointsToMap();         // Add the trackpoints
    //     parser.addRoutepointsToMap();         // Add the routepoints
    //     parser.addWaypointsToMap();           // Add the waypoints
    // })
}
