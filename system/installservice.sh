#!/bin/bash

sudo cp /home/pi/miditoosc/system/units/miditoosc.service /lib/systemd/user/
systemctl daemon-reload
systemctl --user enable miditoosc.service 