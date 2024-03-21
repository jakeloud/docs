---
sidebar_position: 2
---

# Create application with jakeloud

Follow this simple process to deploy an app to the production.

First make sure, that you have set up your ssh key.

## Click add app button

To start click <button class="button button--primary">add app</button> button in admin panel


![admin panel](/img/empty-jakeloud.png)

## Input all information about an app

**Name* **: name of docker container running your app. Should be unique, and not `jakeloud` (it is reserved).
*Docker container name rules apply*.  
**Domain* **: domain of your app. 
**repo* **: repo of the app. In the format of `git@github.com:<user>/<repo>.git`.  
**docker options**: this field is not required. You can input any `docker run` options.  
For example: `-v /home/jakeloud:/home/jakeloud -e PASSWORD=jakeloud`

![app creation](/img/app-creation.png)

Once you created an app, it should be visible in the admin panel.

![admin panel](/img/app-created.png)

You can delete this app by clicking <button class="button button--primary">delete app</button> button,
or fully rebuild it by clicking <button class="button button--primary">full reboot</button> button.