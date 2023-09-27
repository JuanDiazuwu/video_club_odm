FROM node
ENV HOME /app
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT npm start

#CMD ["npm", "start"]