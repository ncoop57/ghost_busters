FROM ubuntu:latest

RUN apt-get update -y && apt-get upgrade -y && apt-get install -y vim curl python-software-properties nginx lsof

ADD reverse_proxy/ /home/reverse_proxy

WORKDIR /home/reverse_proxy

RUN cp ./ghost_buster.conf /etc/nginx/sites-enabled/

EXPOSE 80

CMD bash setup.sh && bash
