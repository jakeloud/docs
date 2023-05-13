---
sidebar_position: 1
---

# Jakeloud intro

Let's discover **Jakeloud in less than 5 minutes**.

## Getting Started

Get started by **creating a new deployment**. You will need sudo rights and `curl` installed.

Login onto your server and run:

```bash
sudo sh -c "$(curl --silent -fsSL https://raw.githubusercontent.com/notTGY/jakeloud/main/install.sh)"
```

The command also installs all necessary dependencies you need to run Jakeloud.

## Finish installation process

### Configure domain

Go to your server's ip address and input domain for jakeloud admin panel along with admin email (this email should be able to receive letters).

### Register admin user

In order to register, you have to setup ssl (so that password can be transmitted safely).
It is important to use the same email you used for domain configuration for admin user.