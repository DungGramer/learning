#!/bin/bash

title() {
  echo -e "\e[1;97;44m$1\e[0m"
}

killPort() {
  pid=$(netstat -aon | findstr $1 | tail -n1 | awk '{print $5}') && taskkill //PID $pid //F
}

case "$1" in

  "dev" | "")
    title "yarn start"
    yarn start
  ;;

  "p" | "prod" | "production")
    title "export NODE_ENV=production && yarn start"
    export NODE_ENV=production
    yarn start
  ;;

  "d" | "debug")
    title "export DEBUG=app:startup,app:db && yarn start"
    export DEBUG=app:startup
    yarn start
  ;;

  "k" | "kill")
    title "Kill port $2"
    killPort "$2"
  ;;

  *)
    echo -e "\e[41m Invalid option: $1\e[0m"
  ;;

esac