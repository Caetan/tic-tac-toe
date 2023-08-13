FROM node:18-alpine

COPY ./client ./client

WORKDIR /client
RUN npm install

# Fix npm start error: https://weekendprojects.dev/posts/fixing-npm-install-error-with-node-sass/
RUN npm install sass --save

EXPOSE 3000
CMD ["npm", "start"]
