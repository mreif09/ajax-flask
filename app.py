from flask import Flask, request, jsonify, render_template, Response
from time import sleep

app = Flask(__name__)


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


if __name__ == '__main__':
    app.run(debug=True)
