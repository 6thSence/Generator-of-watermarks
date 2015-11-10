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
rm -rf /var/www/html
rm /etc/apache2/sites-enabled/000*.conf
rm /etc/apache2/sites-available/000*.conf
cp confs/watermarkGen.conf /etc/apache2/sites-available/watermarkGen.conf
ln -s /etc/apache2/sites-available/watermarkGen.conf /etc/apache2/sites-enabled/watermarkGen.conf
mkdir uploads
chown -R www-data:www-data /var/www/WatermarkGen
a2enmod rewrite
apachectl restart
echo "Change 'AllowOverride None' in <directory /var/www/> to 'AllowOverride All' in apache2.conf"
echo "Enable mod_rewrite: a2enmod rewrite"
echo "Restart apache: apachectl restart"
