
# 🛠 Workshop Client - AC2D Application Simplifiée

## 🚀 Objectifs du projet

Ce projet vise à répondre aux besoins de l'entreprise **AC2D** en réalisant :

- ✅ La **génération simplifiée de bulletins d'essai** pour les techniciens
- ✅ Une **application responsive** et **intuitive** utilisable sur tablette/mobile
- ✅ La **génération automatique de fichiers PDF** conformes aux attentes client
- ✅ L'import et l'exploitation de **fichiers Excel** pour préalimenter les données
- ✅ Un projet réalisé en suivant la méthodologie **workshop client** de **MyDigitalSchool**

---

## 📖 Description du projet

L'application permet aux techniciens AC2D de :

- Se connecter (authentification basique)
- Remplir facilement un bulletin d'essai via des listes déroulantes dynamiques
- Générer un **PDF conforme** à la structure existante
- Accéder à l'historique des bulletins créés
- Importer des données via des fichiers Excel structurés

Le projet respecte les contraintes serveur AC2D et est déployé via **Docker** avec Apache.

---

## 🏗️ Technologies utilisées

| Technologie                 | Description |
|------------------------------|-------------|
| **PHP 8.2+**                 | Langage backend |
| **Symfony 7+**               | Framework PHP |
| **PostgreSQL**               | Base de données relationnelle |
| **React + Tailwind CSS**     | Frontend PWA (Progressive Web App) |
| **Docker & Docker Compose**  | Environnement de développement |
| **PHPStan**                  | Analyse statique du code |
| **PHP CS Fixer**             | Linter pour le code PHP |
| **Puppeteer / DomPDF**       | Génération dynamique des PDF |

---

## 📦 Installation et exécution

### 1️⃣ Prérequis

- **Docker & Docker Compose** installés
- **Make** installé
  (possible de l'installer avec chocolatey via) :

```bash
choco install make
```

### 2️⃣ Installation du projet

```bash
# Cloner le projet
git clone https://github.com/Haykes/Workshop-client
cd Workshop-client

# Construire et démarrer les containers Docker
make install

# Accéder au container php pour installer la suite
make bash

# Appliquer la migration vers la base de donnée
php bin/console doctrine:migration:migrate

# Commande pour alimenter la base de donnée via le fichier d'import 
php bin/console app:import-excel public/Import/import_file.xlsx

# Vider le cache Symfony
make cc
```

---

## 🛠️ Utilisation

### 🌍 Accéder à l'application

L'interface est disponible à l'adresse suivante :

> 📌 **http://localhost:8075/**

L'interface Api est disponible à l'adresse suivante :

> 📌 **http://localhost:8075/api**

La barre de debug Symfony est activée si l'environnement est `dev`.

### 📂 Visualiser les bulletins

- Accès à la liste des bulletins existants
- Génération de nouveau bulletin depuis un formulaire dynamique

### 🔗 API Principaux Endpoints Backend

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/categories` | Liste des catégories |
| `GET` | `/api/categories/{id}/fields` | Liste des champs pour une catégorie |
| `POST` | `/api/bulletins` | Créer un bulletin |
| `GET` | `/api/bulletins/{id}` | Récupérer un bulletin |
| `POST` | `/api/import` | Importer un fichier Excel |


// todo : api via api platform plus tard ...

---

## 🧪 Tests et qualité du code

### 🔍 Exécuter les tests unitaires (PHPUnit)

```bash
make phpunit
```

### 🔍 Exécuter les tests unitaires (CodeCoverage)

```bash
make coverage
```

### 🔍 Analyse statique du code (PHPStan)

```bash
make phpstan
```

### 🔍 Linter le code PHP (PHP CS Fixer)

```bash
make cs-fix
```

---

## 🌟 Modèle de données

Le projet suit le modèle relationnel suivant :

- **User** : utilisateurs de l'application
- **Category** : catégories de tests
- **Field** : champs dynamiques associés aux catégories
- **Bulletin** : bulletin d'essai rempli et généré
- **ImportFile** : gestion des fichiers d'import Excel

Schémas MCD, MLD, MPD disponibles dans la documentation interne.

---

## 📄 Licence

Projet réalisé dans le cadre du **Workshop Client** de **MyDigitalSchool**.

Tous droits réservés. 🚀
