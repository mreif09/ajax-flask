class Session {
    constructor(data) {
        this.session_id = data.session_id
        this.start_time = new Date(data.start_time)
        this.end_time = new Date(data.end_time)
        this.duration = new Date(data.duration)
        this.distance = data.distance
        if (data.sport_type_id == 1) {
            this.sport_type = 'Laufen'
        }
        else
        {
            this.sport_type = 'andere'
        }
    }
}

$("document").ready(function () {
    $.ajax({
        url: "http://localhost:5000/api/sessions",
        type: "POST",
        contentType: "application/json"
    }).done(function (data) {
        console.log(data);
        data.forEach(element => {
            var session = new Session(element)
            $('#output').append(`
                <p class="session">
                    <span class="start_time">${session.start_time.toLocaleString()}</span>
                    <span class="end_time">${session.end_time.toLocaleString()}</span>
                    <span class="duration">${session.duration.toISOString().substr(11, 8)}</span>
                    <span class="distance">${session.distance}m</span>
                    <span class="sport_type">${session.sport_type}</span>
                </p>`);
        });
        // $('#output').text(data);
    });
});
