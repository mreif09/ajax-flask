import json
from time import sleep

from flask import Flask, request, jsonify, render_template, Response, abort, redirect

import model

app = Flask(__name__)
with open('config.json') as fd:
    config = json.load(fd)


@app.route('/form')
def static_html():
    return render_template('form.html')


@app.route('/api/form', methods=["POST"])
def main_interface():
    response = request.get_json()
    print(response)
    response['message'] = '-{}-'.format(response['message'])
    return jsonify(response)


# @app.after_request
# def add_headers(response):
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#     return response


@app.route('/stream')
def stream():
    return render_template('stream.html')


@app.route("/api/stream")
def api_stream():
    def eventStream():
        i = 0
        while i < 10:
            i = i + 1
            yield 'data: mein_test {}\\n\n\n'.format(i)
            sleep(0.1)

    return Response(eventStream(), mimetype="text/event-stream")


@app.route('/poll')
def poll():
    return render_template('poll.html')


@app.route("/api/poll", methods=["POST"])
def api_poll():
    offset = request.get_json()['offset']

    text = 'line1\nl2\nline3\n' * 200
    output = text[offset:offset+10]
    index = output.rfind('\n')
    return output[0:index+1]

@app.route('/')
def root():
    return redirect('/sessions')

@app.route('/sessions')
def sessions():
    return render_template('sessions.html', config=config)

@app.route('/body')
def body():
    return render_template('body.html', config=config)

@app.route('/heart')
def heart():
    return render_template('heart_rate.html', config=config)

@app.route('/api/sessions')
def api_sessions():
    return jsonify([session.data for session in model.get_sessions().values()])


@app.route('/api/gpx/<id>')
def api_gpx(id):
    gpx = model.get_gpx(id)

    if not gpx:
        abort(404)

    resp = Response(gpx)
    resp.cache_control.max_age = 3600

    return resp


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
