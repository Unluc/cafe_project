#!/bin/sh
apt-get update  # To get the latest package lists
apt-get install python3 -y
apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
apt install nodejs npm
apt install make
apt install build-essential
apt install postgresql postgresql-contrib
apt install postgresql postgresql-contrib