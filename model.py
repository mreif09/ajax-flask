import json
import pathlib
class Serializable():
    @property
    def json(self):
        return json.dumps(self.data)

    @property
    def data(self):
        return self.__dict__


class Session(Serializable):
    def __init__(self, data):
        self.session_id = data['id']
        self.start_time = data['start_time']
        self.end_time = data['end_time']
        self.duration = data['duration']
        self.distance = data['distance']
        self.sport_type_id = data['sport_type_id']


def get_sessions():
    data_dir = pathlib.Path('Runtastic_Export/Sport-sessions')
    sessions = {}

    for session_path in data_dir.glob('*.json'):
        with open(session_path) as fd:
            data = json.load(fd)
        session = Session(data)
        sessions[session.session_id] = session

    return sessions