FROM ubuntu:latest

RUN apt-get update -y && apt-get upgrade -y && apt-get install -y vim curl python-software-properties nginx lsof

ADD reverse-proxy/ /home/reverse-proxy

WORKDIR /home/reverse-proxy

RUN cp ./ghost_buster.conf /etc/nginx/sites-enabled/

EXPOSE 80

CMD bash setup.sh && bash
