#!/bin/bash

title() {
  echo -e "\e[1;97;44m$1\e[0m"
}

case "$1" in

  "d" | "dev" | "")
    title "yarn start"
    yarn start
  ;;

  "p" | "prod" | "production")
    title "export NODE_ENV=production && yarn start"
    export NODE_ENV=production
    yarn start
  ;;

  *)
    echo -e "\e[41m Invalid option: $1\e[0m"
  ;;

esac