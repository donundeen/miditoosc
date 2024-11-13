#!/bin/bash

cp /home/pi/midiosc/system/units/midiosc.service /lib/systemd/user/
systemctl daemon-reload
systemctl --user enable midiosc.service 