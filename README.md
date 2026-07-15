<div align="center">

# OpenClassrooms - Eco-Bliss-Bath
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

# Prérequis
Pour démarrer cet applicatif web vous devez avoir les outils suivants:
- Docker
- NodeJs

# Installation et démarrage
Clonez le projet pour le récupérer
``` 
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2
```
Pour démarrer l'API avec ça base de données.
```
docker compose up -d
```
# Pour démarrer le frontend de l'applicatif
Rendez-vous dans le dossier frontend
```
cd ./frontend
```
Installez les dépendances du projet
```
npm i
ou
npm install (si vous préférez)
```
# Exécution des tests Cypress

Depuis le dossier `frontend`, lancez Cypress avec la commande :

```bash
npx cypress open
```

Une fois Cypress ouvert :

- Sélectionnez **E2E Testing** ;
- Choisissez le navigateur souhaité (Chrome) ;
- Cliquez sur le fichier de test que vous souhaitez exécuter.

Pour exécuter tous les tests en mode graphique, ouvrez chaque fichier de test depuis Cypress.

# Exécution des tests en ligne de commande

Pour exécuter l'ensemble des tests sans ouvrir l'interface Cypress :

```bash
npx cypress run
```