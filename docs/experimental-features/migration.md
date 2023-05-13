# Migrating Jakeloud

## Why this is experimental

See, migration is not as simple as just moving all your applications to another server.
This process may be slow (depending on your nameservices update speed and the amount of apps you have).
So If you want to migrate, you should be careful.

Also, there is no need to migrate every day, so this feature is not considered essential.

## How to migrate

Download `conf.json` in your jakeloud app settings.

![admin panel](/img/empty-jakeloud.png)

Then install jakeloud on the machine you want migrate to.

Copy `conf.json` to `/etc/jakeloud/conf.json`. And restart jakeloud by running:

```bash
sudo systemctl restart jakeloud
```

After that go to the admin panel and manually restart each app, as its' dns record starts pointing to the new server.