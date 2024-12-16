import express from "express";

//import routers from route module
import companyRouter from "./Routes/company.routes";
import branchesRouter from "./Routes/branch.routes";
import responseMiddleware from "./middleware/response.middleware";

//create a new express server
const AppServer = express();

// set a new port and type of http request
AppServer.set("port", 4000);
AppServer.use(express.json());

//Middleware
AppServer.use(responseMiddleware); //this middleware will help to manage the http response

// API ENDPOINTS
AppServer.use("/api/v1/settings/companies", companyRouter)
AppServer.use("/api/v1/settings/branches", branchesRouter)


//export the appserver
export default AppServer;


