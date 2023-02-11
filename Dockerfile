FROM node:16
WORKDIR /app
COPY package.json ./

RUN npm install
COPY . .
CMD [ "node", "server.js" ]

# docker run -it -v /mnt/c/projects/RocketBot/config:/app/config --entrypoint sh rocketbotado