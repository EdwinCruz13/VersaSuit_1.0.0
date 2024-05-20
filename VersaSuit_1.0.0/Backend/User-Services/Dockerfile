#dockerfile for userservices

#base images nodejs
FROM node:16.17.0 as userservice

# create a folder on usr/app
RUN mkdir -p /usr/app/userservice

#set the working directory
WORKDIR /usr/app/userservice

#copy package.jsons to the working directory
COPY package*.json ./

#install dependenciy
RUN npm install

#copy the files from the project to the working directory 
#check the dockerignore because we donnt want to
#copy all the node_module folder
COPY . .

#expose a port 
EXPOSE 4000

#start the app
CMD ["npm", "start"]






# FROM node:16.17.0 as userservice

# RUN mkdir -p /home/versasuit/userservices 

# WORKDIR /home/versasuit/userservices

# COPY . /home/versasuit/userservices

# RUN npm install 

# EXPOSE 4000

# RUN npm run build 

# CMD ["node", "/home/versasuit/userservices/build/index.js"]

