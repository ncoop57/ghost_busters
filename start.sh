#! /bin/sh

rm -fr auth-ms/models
cp -r models/ auth-ms/

rm -fr web-ms/models
cp -r models/ web-ms/

cd docker-compose

sudo docker-compose up --build 
