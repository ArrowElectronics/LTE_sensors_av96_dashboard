import os
import threading
import json
import logging
from time import sleep

from flask import Flask, render_template, request, jsonify

import serial
from flask_socketio import SocketIO, emit

DEVICE_PATH = '/dev/ttyRPMSG0'
DEVICE_BAUD_RATE = 115200

ECHO_DEVICE_DATA = "echo START > /dev/ttyRPMSG0"

ser = serial.Serial(DEVICE_PATH, DEVICE_BAUD_RATE)
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, logging=False, engineio_logger=False)

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)


def message_recieved(data):
    socketio.emit('message_from_server', data)


def update_output(ser):
    while True:
        os.system(ECHO_DEVICE_DATA)
        sensor_data = ser.readline().decode().replace('\x00', '')
        my_json = json.loads(sensor_data)
        json_format = json.dumps(my_json, indent=4, sort_keys=True)
        message_recieved(json_format)
        sleep(.2)


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
    socketio.run(app, host='0.0.0.0', port=5000, debug=False, log_output=False)

if KeyboardInterrupt:
    print("exiting")
    exit(0)
