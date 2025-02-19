This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Connexion à la DataBase
# Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [MySQL](https://dev.mysql.com/downloads/mysql/) : Assurez-vous que le serveur MySQL est installé et en cours d'exécution.

# - Créer la Base de Données Destination (si nécessaire)

Si la base de données destination n'existe pas, assurez-vous de la créer en utilisant la commande suivante dans le terminal ou la console MySQL :

mysql -u UtilisateurDestination -p MotDePasseDestination -e "CREATE DATABASE IF NOT EXISTS BaseDestination;"

# - Importer dans la Base de Données Destination

Utilisez la commande suivante pour importer le fichier SQL exporté dans la base de données destination (remplacez les valeurs entre crochets par vos informations) :

mysql -u UtilisateurDestination -p MotDePasseDestination BaseDestination < Chemin\Vers\Votre\FichierExport.sql

# - Vous pouvez maintenant avoir accès à la DataBase.

