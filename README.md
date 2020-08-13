# LTE Sensors Av96 Dasboard

Demo for LTE Sensor Mezannine running in Flask Server hosted in Avenger96 board

![Alt-Text](/images/avenger_UI.JPG)

## Requirements

Run in Terminal/Command Prompt:

```
apt-get update
apt-get install python3-pip python3-flask
apt-get instal git
pip3 install -r requirements.txt
git clone https://gitlab.com/arrowelectronics/96boards/LTE_sensors_av96_dasboard.git
cd LTE_sensors_av96_dasboard
```

## How to use this app

Run this app locally by:

in home/root

```
./fw_cortex_m4.sh start
```

in LTE_sensors_av96_dasboard

```
python3 app.py
```

if connected via usb:

Open http://http://192.168.7.1:5000// in your browser, you will see a live-updating dashboard.

if connect via same ethernet find the IP Address of the Avenger96 board and add IP_Address:5000 port 5000 in the browser

## Built With

## Server:

- Python
- Flask
- Flask-SocketIO
- pyserial
- threading

## Client:

- JavaScript
- echarts
- materialize
- socketio

Use of CDN links or download the js files from CDN to run the packages locally.
Currently the packages are local, find them in statiic/js directory.
