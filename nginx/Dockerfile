############################################################
# Dockerfile to build CentOS,Nginx installed  Container
# Based on CentOS
############################################################

# Set the base image to CentOS
FROM centos:latest

# File Author / Maintainer
MAINTAINER Issaku Yamada <yamadaissaku@gmail.com>

# Add the ngix and PHP dependent repository
ADD nginx.repo /etc/yum.repos.d/nginx.repo

# Installing nginx 
RUN yum -y install nginx
#RUN yum -y install nginx --with-http_ssl_module

# Installing PHP
RUN yum -y --enablerepo=remi,remi-php56 install nginx php-fpm php-common

# Installing supervisor
RUN yum install -y python-setuptools
RUN easy_install pip
RUN pip install supervisor
# RUN yum install epel-release
# RUN yum -y install wget
# RUN yum -y install unzip

# ssl
RUN mkdir /etc/nginx/ssl
#RUN cd /etc/nginx/ssl
#RUN openssl req -new -x509 -sha256 -newkey rsa:2048 -days 365 -nodes -out /etc/nginx/ssl/nginx.pem -keyout /etc/nginx/ssl/nginx.key

# Adding the configuration file of the nginx
ADD nginx.conf /etc/nginx/nginx.conf
ADD default.conf /etc/nginx/conf.d/default.conf
#ADD ssl.conf /etc/nginx/conf.d/ssl.conf

# Adding the configuration file of the Supervisor
ADD supervisord.conf /etc/

# Adding the default file
ADD index.php /var/www/index.php

# Set the port to 80 
EXPOSE 80

# Executing supervisord
CMD ["supervisord", "-n"]
