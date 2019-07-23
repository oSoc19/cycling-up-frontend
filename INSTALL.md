# Front-End install

Ubuntu 18.04

## Requirements

```bash
sudo apt-get update
sudo apt-get dist-upgrade
sudo dpkg-reconfigure tzdata

sudo apt-get install apache2

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

### Certbot

[Certbot](https://certbot.eff.org/) is used to generate SSL certificates.
See [Certbot documentation](https://certbot.eff.org/lets-encrypt/ubuntubionic-apache) for installation process.

## Automated deploy

**Based on [*Deploy a website to a remote server with Git push*](https://medium.com/@francoisromain/vps-deploy-with-git-fea605f1303b)** by [@francoisromain](https://github.com/francoisromain)

Command to deploy from local:
```bash
git remote add deploy ssh://<user>@<ip-address>:/srv/app/git/frontend.git
git push deploy
```
