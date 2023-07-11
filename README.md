# E-Note
## Description
E-note est une application de prise de note à plusieurs en temps réel. Elle permet de créer, modifier et supprimer des notes.
L'application est développée en REACT pour le FRONT et NODE.JS pour le back, et pour la base de données j'utilise 
POSTGRESQL.

## Lancement de l'éxécutable
Pour lancer l'application, il faut télécharger le fichier .exe se trouve dans le dossier client/dist/.
## Installation
L'application est composée de 2 parties : le front et le back. 
Pour installer l'application, il faut suivre les étapes suivantes :

### Back
La partie Back se trouve dans le dossier server.

1. Se rendre dans le dossier server
```bash
cd server
```
2. Installer les dépendances
```bash
yarn
```
3. Dupliquer le fichier .env.example et le renommer en .env

Si vous avez docker d'installé sur votre machine, vous pouvez lancer la base de données avec la commande suivante :
```bash
docker compose up -d
```
Sinon vous devez faire tourner une base de données postgresql sur le port 5432, il faudra changer les informations de connexion dans le fichier .env

1. Lancer la migration de la base de données
```bash
yarn migrate
```

1. Seeder la base
```bash
yarn seed
```

1. Lancer le serveur
```bash
yarn dev
```

### Front
La partie Front se trouve dans le dossier client, ouvrez un nouveau terminal.

1. Se rendre dans le dossier client
```bash
cd client
```

1. Installer les dépendances
```bash
yarn
```

1. Lancer le serveur
```bash
yarn dev
```

Dans le cas ou l'application ne se lance pas, il faut lancer le serveur electron et le serveur react séparément.
Lancer ces commandes:
```bash
yarn electron:dev
```
et 
```bash
yarn react:dev
```




