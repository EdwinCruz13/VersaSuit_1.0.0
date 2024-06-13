import express from "express";

//import routers from route module
import companyRouter from "./Routes/company.routes";

//create a new express server
const AppServer = express();

// set a new port and type of http request
AppServer.set("port", 4003);
AppServer.use(express.json());

// API ENDPOINTS
AppServer.use("/api/v1/settings/companies", companyRouter)


//export the appserver
export default AppServer;


