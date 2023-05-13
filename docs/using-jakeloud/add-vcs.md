---
sidebar_position: 1
---

# Add git credentials

This is an essential step to run or update apps.

## Click manage VCS button

To start click <button class="button button--primary">manage VCS</button> button in admin panel


![admin panel](/img/empty-jakeloud.png)

## Get your Personal Access Token from github

:::info

If you don't use github, you shouldn't get this token. Instead, you will need to get the password of your user.

:::

1. Go to [github.com](http://github.com)
2. Click icon of your user in top left corner
3. Click `Settings` in the popup menu, that just appeared
4. Click `Developer settings` button in the sidebar
5. Click `Personal access tokens` > `Tokens (classic)`
6. Generate new __classic__ github token

You will need to enable at least `repo` scope.

## Input your github credentials

Here `user` is your github username, token is your personal access token and host will always be `github.com`.

:::tip

If you don't need access to private repositories, you can leave user and token fields empty.

:::

![form for adding new vcs](/img/creating-vcs.png)

If you have done everything right, you will see something like this. Clicking <button class="button button--danger">delete vcs</button> will delete this profile.
![new vcs](/img/vcs-created.png)
