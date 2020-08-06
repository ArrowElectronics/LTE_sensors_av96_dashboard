from flask import Flask, render_template, request, jsonify
from time import sleep
import serial
import os
import threading
from flask_socketio import SocketIO, emit
import json

ser = serial.Serial('/dev/ttyRPMSG0', 115200)
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


def message_recieved(data):
    socketio.emit('message_from_server', data)


def update_output(ser):
    while True:
        os.system("echo START > /dev/ttyRPMSG0")
        sensor_data = ser.readline().decode().replace('\x00', '')
        my_json = json.loads(sensor_data)
        json_format = json.dumps(my_json, indent=4, sort_keys=True)
        message_recieved(json_format)
        # sleep(.5)


@ app.route('/')
def use_serial():
    return render_template("index.html")


@socketio.on('connect')
def connect():
    print('(server): client connected')


@socketio.on('disconnect')
def disconnect():
    print('(server): client disconnected')


if __name__ == '__main__':
    thread = threading.Thread(target=update_output, args=(ser,))
    thread.setDaemon(True)
    thread.start()
    socketio.run(app, host='0.0.0.0', port=5000, debug=False)

if KeyboardInterrupt:
    print("exiting")
    exit(0)
