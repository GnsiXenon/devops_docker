# Étape 1 : Build de l’application
FROM node:21.5.0 AS builder

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./

# Installer npm à la bonne version
RUN npm install --global npm@10.2.4

# Installer uniquement les dépendances nécessaires au build
RUN npm install --omit=dev

# Copier le reste des fichiers source
COPY . .

# Construire l’application Next.js (génération du dossier `.next`)
RUN npm run build

# Étape 2 : Image finale légère pour exécution
FROM node:21.5.0-alpine

WORKDIR /app

# Copier uniquement les fichiers essentiels depuis l'étape de build
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Exposer le port 3000
EXPOSE 3000

# Lancer Next.js en mode production
CMD ["npm", "run", "start"]
