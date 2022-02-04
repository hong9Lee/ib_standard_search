#!/bin/sh

# set directory
SCRIPT=$0
APP_NAME=standard_search
APP_ROOT=$(dirname "$SCRIPT")
APP_ROOT=$(cd "$APP_ROOT/.." || exit; pwd)

# copyright
echo 'STANDARD_SEARCH'
echo 'Copyright (C) I-Bricks, Inc. All Rights Reserved.'
echo ''

# set script
#SCRIPT_PATH=$APP_ROOT/bin/bin.js
SCRIPT_PATH=$APP_ROOT/bin/pm2_config.json
echo "$SCRIPT_PATH"
# set log path
# LOG_PATH=$APP_ROOT/logs

# set pm2
PM2=$APP_ROOT/node_modules/pm2/bin/pm2
PM2_HOME=$APP_ROOT/.pm2
export PM2_HOME

# command
case $1 in
start)
	echo 'start server ...'
	cd "$APP_ROOT" || exit
#	"$PM2" start --name="$APP_NAME" --restart-delay 1000 --max-restarts 0 "$SCRIPT_PATH"
	"$PM2" start "$SCRIPT_PATH" --env production
	;;
restart)
	echo 'restart server ...'
	"$PM2" restart "$APP_NAME"
	;;
stop)
	echo 'stop server ...'
	"$PM2" stop "$APP_NAME"
	;;
delete)
	echo 'remove server ...'
	"$PM2" delete "$APP_NAME"
	;;
info)
	echo 'describe all parameters ...'
	"$PM2" info "$APP_NAME"
	;;
logs | log)
	echo 'stream log file ...'
	"$PM2" log "$APP_NAME"
	;;
list)
	echo 'listing server ...'
	"$PM2" list
	;;
*)
	echo ' usage: '"$0"' [command]'
	echo ''
	echo ' command:'
	echo '   start               start a server'
	echo '   restart             restart a server'
	echo '   stop                stop a server'
	echo '   delete              remove a server'
	echo '   info                describe all parameters'
	echo '   logs                stream log file'
	echo '   list                list all servers'
	echo ''
	;;
esac
