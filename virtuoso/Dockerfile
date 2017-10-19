FROM ubuntu:14.04.2
MAINTAINER Issaku Yamada  <yamadaissaku@gmail.com>

RUN export DEBIAN_FRONTEND=noninteractive && \
  apt-get update && \
  apt-get -y upgrade && \
  apt-get -y install \
        git \
	automake \
	autoconf \
	bison \
	flex \
	gawk \
	gperf \
	libtool \
	build-essential \
	libssl-dev \
        wget \
        unzip \
        libreadline-gplv2-dev

RUN adduser --disabled-password --home=/home/virtuoso --gecos "" virtuoso && \
    chown -R virtuoso:virtuoso /home/virtuoso

WORKDIR /home/virtuoso

RUN git clone https://github.com/openlink/virtuoso-opensource.git

WORKDIR /home/virtuoso/virtuoso-opensource

RUN git branch stable/7 origin/stable/7 && \
    git checkout stable/7 && \
    ./autogen.sh && \
    ./configure --with-readline && \
    make && \
    make install && \
    mkdir -p /usr/local/virtuoso-opensource/lib/virtuoso/hosting && \
    chown -R virtuoso:virtuoso /usr/local/virtuoso-opensource/ && \
    mkdir -p /usr/local/virtuoso-opensource/ttl

USER virtuoso

CMD /usr/local/virtuoso-opensource/bin/virtuoso-t -f -c /usr/local/virtuoso-opensource/var/lib/virtuoso/db/virtuoso.ini
