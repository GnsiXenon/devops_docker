#lancer next node V21.5.0 et npm V10.2.4
FROM node:21.5.0

WORKDIR /app

COPY package.json ./

RUN npm install --global npm@10.2.4

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


#docker build -t geoguessr .    

#docker run -it -p 3000:3000 geoguessr