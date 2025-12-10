#!/bin/bash

# Installation des dépendances Symfony
composer install

# Préparation du cron
mkdir -p /var/log/cron
touch /var/log/cron/cron.log
chmod 777 /var/log/cron/cron.log
chmod -R 0644 /var/spool/cron/crontabs

echo "otot"

set -m

# Lancement en arrière-plan de php-fpm
php-fpm &

# Lancement du cron en arrière-plan
crond

# Mise au premier plan de php-fpm pour ne pas que le conteneur s'arrête
fg %1
