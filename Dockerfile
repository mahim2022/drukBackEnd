FROM node:alpine
# WORKDIR /usr/src/server
COPY . .
RUN npm i pm2 -g
RUN npm i
# CMD ["npm","run","production"]
CMD ["pm2-runtime", "index.js"]