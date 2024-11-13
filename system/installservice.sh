#!/bin/bash

cp /home/pi/pikioskwebpage/system/units/pikioskwebpage.service /lib/systemd/user/
systemctl daemon-reload
systemctl --user enable pikioskwebpage.service 