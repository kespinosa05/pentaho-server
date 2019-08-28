#!/bin/sh
set -e

APP_NAME=pentaho
APP_ROOT=/opt/pentaho

if [ -z "$TIMEZONE" ]; then
echo "···································································································"
echo "VARIABLE TIMEZONE NO SETEADA - INICIANDO CON VALORES POR DEFECTO"
echo "POSIBLES VALORES: America/Montevideo | America/El_Salvador"
echo "···································································································"
else
echo "···································································································"
echo "TIMEZONE SETEADO ENCONTRADO: " $TIMEZONE
echo "···································································································"
echo "SETENADO TIMEZONE"
cat /usr/share/zoneinfo/$TIMEZONE > /etc/localtime && \
echo $TIMEZONE > /etc/timezone
fi

cd /opt/pentaho-server/tomcat && rm -rf temp/* work/* logs/*
rm -rf /opt/pentaho-server/pentaho-solutions/system/karaf/caches/default/* /opt/pentaho/pentaho-solutions/system/jackrabbit/repository
cd $APP_ROOT
echo "INICIANDO $APP_NAME...."
sleep 5s
exec "$@"
