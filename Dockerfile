FROM node:18.20.8
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

#asegurarte de que el contenedor está funcionando correctamente
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s \
CMD curl -f http://localhost:3000/api/message || exit 1