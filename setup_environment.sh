#!/bin/bash
sudo lxc launch alpine demo
sudo lxc config device add demo hostport80 proxy listen=tcp:0.0.0.0:80 connect=tcp:127.0.0.1:80
sudo lxc file push app demo/bin/app
echo "Adding reverse proxy..."
sudo lxc exec demo -- apk update
sudo lxc exec demo -- apk add --no-cache nginx
sudo lxc file push nginx.conf demo/etc/nginx/nginx.conf
sudo lxc exec demo -- rc-update add nginx
sudo lxc exec demo -- rc-service nginx start
echo "Adding postgresql..."
sudo lxc exec demo -- apk add --no-cache net-tools postgresql
echo "Creating database folders..."
sudo lxc exec demo -- mkdir /run/postgresql
sudo lxc exec demo -- mkdir /var/lib/postgresql/data
sudo lxc exec demo -- chown postgres:postgres /run/postgresql/
sudo lxc exec demo -- chown postgres:postgres /var/lib/postgresql/data
echo "Setting up database..."
sudo lxc exec demo -- su postgres -c "initdb -D /var/lib/postgresql/data/;"
sudo lxc exec demo -- su postgres -c 'pg_ctl start -D /var/lib/postgresql/data -l /var/lib/postgresql/start-server.log'
echo "Adding database..."
sudo lxc exec demo -- psql -U postgres -c 'create database gobuff_realworld_example_app_development;'
echo "Running migrations..."
sudo lxc exec demo -- /bin/app migrate
echo "Starting web application..."
sudo lxc exec demo -- /bin/app