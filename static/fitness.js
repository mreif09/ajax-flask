"use strict";
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
        else if (data.sport_type_id == 3) {
            this.sport_type = 'Radfahren'
        }
        else {
            this.sport_type = 'andere';
        }
    }
}
