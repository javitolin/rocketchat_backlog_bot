FROM node:19 AS build
WORKDIR /app
COPY . .
RUN npm install

FROM node:19-alpine
WORKDIR /app
COPY --from=build /app /app

CMD [ "node", "server.js" ]

# docker build . -t rocketadobot && docker run -it -v /mnt/c/projects/RocketBot/config:/app/config -v /mnt/c/projects/RocketBot/dod:/data/dod rocketadobot