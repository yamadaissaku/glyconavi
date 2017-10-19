# SSH setting
# afer docker-compose up

$ dcoker exec -it {nginx ID} /bin/bash

# in the docker nginx image 
$ openssl req -new -x509 -sha256 -newkey rsa:2048 -days 365 -nodes -out /etc/nginx/ssl/nginx.pem -keyout /etc/nginx/ssl/nginx.key

# restart nginx
$ nginx -s reload


