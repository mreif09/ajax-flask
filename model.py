import json
import pathlib

_SESSION_PATH = pathlib.Path('Runtastic_Export/Sport-sessions')

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


class HertRate(Serializable):
    def __init__(self, data):
        self.heart_rate = data['heart_rate']
        self.timestamp = data['timestamp']
        self.duration = data['duration']
        self.distance = data['distance']


def get_sessions():
    data_dir = _SESSION_PATH
    sessions = {}

    for session_path in data_dir.glob('*.json'):
        with open(session_path) as fd:
            data = json.load(fd)
        session = Session(data)
        sessions[session.session_id] = session

    return sessions

def get_gpx(id):
    gpx_path = _SESSION_PATH / 'GPS-data' / f'{id}.gpx'

    if gpx_path.is_file():
        with open(gpx_path) as fd:
            gpx = fd.read()
    else:
        gpx = None

    return gpx

def get_heart_rate(id):
    hr_path = _SESSION_PATH / 'Heart-rate-data' / f'{id}.json'

    if hr_path.is_file():
        with open(hr_path) as fd:
            data = json.load(fd)
    else:
        data = None

    return data