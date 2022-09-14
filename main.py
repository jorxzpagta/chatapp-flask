from flask import Flask, render_template, request, session, redirect, url_for
from flask_socketio import SocketIO, send, emit

# initializations
app = Flask(__name__)
app.config['SECRET'] = 'dev'
socketio = SocketIO(app, cors_allowed_origins='*')

# event handlers : What to do with the 'message'


@socketio.on('message')
def handle_message(message):
    print("Received message: " + message)
    if message != "User Connected!":
        send(message, broadcast=True)


@socketio.on('sendMessage')
def handle_my_custom_event(name, msg):
    print("Received message: " + name + ": " + msg)
    emit('appendMessage', (name, msg), broadcast=True)


# Navigation
@app.route('/chatapp', methods=['GET', 'POST'])
def chatapp():
    user = request.form.get('name')
    return render_template('index.html', user=user)

@app.route('/')
@app.route('/login')
def login():
    return render_template('login.html')


if __name__ == '__main__':
    socketio.run(app, host="192.168.0.107")  # Run in localhost
