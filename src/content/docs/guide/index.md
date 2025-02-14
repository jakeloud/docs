---
title: Jakeloud intro
sidebar:
  order: 1
---

Let's discover **Jakeloud in less than 5 minutes**.

## System requirements

OS: Debian 11+ / Ubuntu 20+

RAM: 0.5 GB

Disk space: 1.6 GB
(all required packages and runtime)


## Getting Started

Get started by **creating a new deployment**. You will need sudo rights and `curl` installed.

Login onto your server and run:

```bash
curl -fsSL https://jakeloud.com/install-all | sh
```

The command also installs all necessary dependencies you need to run Jakeloud.

## Finish installation process

### Configure domain

Go to your server's ip address and input domain for jakeloud admin panel along with admin email (this email should be able to receive letters).

![setup domain](@/assets/jakeloud-domain.png)

### Register admin user

In order to register, you have to setup ssl (so that password can be transmitted safely).

:::note[Unsure about that]
It is important to use the same email you used for domain configuration for admin user.
:::

![register](@/assets/register.png)

In case your session expired, you can log in again.

![login](@/assets/login.png)

In the end you will have admin panel like this:

![admin panel](@/assets/empty-jakeloud.png)

