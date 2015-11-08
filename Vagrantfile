#-*- mode: ruby -*-
#vi: set ft=ruby :

Vagrant.configure(2) do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.network "private_network", ip: "188.166.18.208"
    config.vm.hostname = "filimonow.ru"
    config.vm.synced_folder "~/Documents/Projects/Frontend/Watermark-Generator", "/var/www/WatermarkGen", :mount_options => ["dmode=777", "fmode=666"]
    config.vm.provision :shell, path: "confs/provision.sh"
end