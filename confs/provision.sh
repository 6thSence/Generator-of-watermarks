#!/bin/bash

sudo su
apt-get update
apt-get upgrade
apt-get install -y git
apt-get install -y apache2
apt-get install -y php5
apt-get install -y libapache2-mod-php5
apt-get install -y php5-mcrypt
apt-get install -y php5-gd
apt-get install -y ruby
apt-get install -y ruby-dev
apt-get install -y nodejs
apt-get install -y npm
ln -s /usr/bin/nodejs /usr/bin/node
npm install -g bower

# Install php requirements
cd /var/www/WatermarkGen/
curl -sS https://getcomposer.org/installer | php
php composer.phar install

# Install frontend requirements
npm install
bower install --allow-root
gem install compass

# Setup apache
# Change allow_rewrite in apache2.conf!!!
rm /etc/apache2/sites-enabled/*.conf
rm /etc/apache2/sites-available/*.conf
cp confs/watermarkGen.conf /etc/apache2/sites-available/watermarkGen.conf
ln -s /etc/apache2/sites-available/watermarkGen.conf /etc/apache2/sites-enabled/watermarkGen.conf
mkdir uploads
cd ..
chown -R www-data WatermarkGen
cd WatermarkGen
a2enmod rewrite
apachectl restart

