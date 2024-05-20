FROM node:16.17.0

RUN mkdir -p /home/versasuit/userservices 

COPY . /home/versasuit/userservices

EXPOSE 4000

CMD ["node", "/home/versasuit/userservices/dist/index.js"]