FROM node

RUN apt-get update && apt-get install -y openssh-server git \
  && mkdir /var/run/sshd \
  && sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config \
  && sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

COPY . .
RUN npm i

CMD echo "root:${PASSWORD}" | chpasswd \
  && npm run start --port 80 \
  && /usr/sbin/sshd -D
