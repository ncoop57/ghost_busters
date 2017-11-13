#! /bin/sh

rm -fr auth-ms/models
cp -r models/ auth-ms/

rm -fr webui-ms/models
cp -r models/ webui-ms/

rm -fr users-ms/models
cp -r models/ users-ms/

cd auth-ms/
npm install

cd ..

cd webui-ms/
npm install

cd ..

cd users-ms/
npm install

cd ..

cd docker-compose

sudo docker-compose up --build 
