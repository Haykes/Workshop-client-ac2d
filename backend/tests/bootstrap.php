<?php

declare(strict_types=1);

use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__).'/vendor/autoload.php';

// Charger les variables d'environnement
(new Dotenv())->bootEnv(dirname(__DIR__).'/.env');

// S'assurer que APP_DEBUG est un booléen avant de l'utiliser dans la condition
if ((bool) ($_SERVER['APP_DEBUG'] ?? false)) {
    umask(0000);
}
