# On Premise dev servers

## Why this is experimental

Jakeloud is ment to be mainly used for production.
Running applications in dev mode is considered to be unsafe.

Most importantly, I do not understand if there is a need for on premise in real world.

## How to enable this feature

To create on premise dev server, you need to have `dev.Dockerfile` in the root of your app.

```dev.Dockerfile
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
```

As you can see, on premise is mostly about adding ssh server into your application.
Then jakeloud makes sure that it works.

## Creating on premise dev server

Click <button class="button button--primary">on-premise dev server</button> button on the app, that you want to create on premise server for.

![screenshot of onpremise eligible app](/img/onpremise-eligible.png)


**name* **: unique name for onpremise.  
**domain* **: domain name.  
**docker options**: docker options for onpremise. Probably the place you want to put the password in.


![creation of onpremise](/img/onpremise-creation.png)

Once you finished, you will have onpremise server with ssh access.

![created onpremise](/img/onpremise-created.png)

On premise server has all capabilites of normal app.
Additionally, you can use ssh command to connect to your onpremise server with the given port.

```bash
ssh -p 38005 root@onpremise-1.yam.pw
```

You can also use VS code [Remote Explorer extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) to access your onpremise server.