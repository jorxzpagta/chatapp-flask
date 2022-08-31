from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit


app = Flask(__name__)
app.config['SECRET'] = 'dev'
socketio = SocketIO(app, cors_allowed_origins='*')


# event handlers : What to do with the 'message'
@socketio.on('message')
def handle_message(message):
    print("Received message: " + message)
    if message != "User Connected!":
        send(message, broadcast=True)


# Navigation
@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    socketio.run(app, host="localhost") # Run in localhost


