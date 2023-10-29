FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD PORT=3000 npm start

#CMD ["npm", "start"]