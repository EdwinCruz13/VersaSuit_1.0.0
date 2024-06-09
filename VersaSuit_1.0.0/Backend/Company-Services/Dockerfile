#dockerfile for companyservices

#base images nodejs
FROM node:16.17.0 as companyservice

# create a folder on usr/app
# RUN mkdir -p /usr/app/userservice

#create the directory and use it
WORKDIR /usr/app/companiesservices

#copy the the package json
COPY package.*json ./

#copy the the package json
COPY tsconfig.*json ./

#copy the src file
COPY /src .

#install the node module from the package.json
RUN npm install

#expose the port 4001
EXPOSE 4001

#start the app
CMD ["npm", "start"]


 
