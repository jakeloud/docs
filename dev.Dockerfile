FROM node

COPY . .
RUN npm i && npm run build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 build /usr/share/nginx/html

RUN apt-get update && apt-get install -y openssh-server git \
  && mkdir /var/run/sshd \
  && sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config \
  && sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

CMD echo "root:${PASSWORD}" | chpasswd \
  && /usr/sbin/sshd -D
 