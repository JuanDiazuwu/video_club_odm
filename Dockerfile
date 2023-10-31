FROM node:alpine
WORKDIR /app
COPY . .
ENV MONGODB_URI='mongodb://mongo:ffaG135ecC22Dh6-d5aBCEa1bAbHhbg-@monorail.proxy.rlwy.net:33035'
RUN npm install
EXPOSE 3000
CMD PORT=3000 npm start

#CMD ["npm", "start"]