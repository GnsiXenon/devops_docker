# Projet GeoGuessr - DevOps

Nous sommmes une équipe de 4 pour ce projet DevOps. Notre but c'est de faire un petit clone de GeoGuessr version YNOV🌍

## L'équipe
- [Rayen]
- [Tom.S]
- [Matheo.H]
- [Kylian]

## C'est quoi le projet?
On a fait une appli web avec:
- Du Next.js pour le front 
- Une API en Go 
- MySQL pour la bdd

## Comment lancer le projet

D'abord faut installer:
- Docker
- Docker compose

Ensuite:
1) Clone le repo
```
git clone [url-du-repo]
```

2) Lance tout avec docker compose
```
docker compose up --build
```

Si ça marche pas du premier coup, essaie `docker compose down` et relance

## Les ports
- front -> localhost:3000
- api -> localhost:7000
- bdd -> 3306 (mysql)

## Les routes de l'api
- `/test-db` -> verifie si la bdd marche
- `/score` -> pour les scores (get/post)
- `/salle` -> gestion des rooms
- `/image` -> recup les images
- `/login` -> connexion

## Trucs importants
- On utilise docker
- Les données de la bdd sont pas perdues grace aux volumes
- Ya des commentaires dans le code si vous comprenez pas un truc

TODO: 
- [ ] Ajouter plus de tests
- [ ] Finir la page de score
- [ ] Mettre à jour les images