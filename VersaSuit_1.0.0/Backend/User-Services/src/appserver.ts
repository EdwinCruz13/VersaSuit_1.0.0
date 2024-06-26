import express from "express";

//import routers from route module
import UserRouter from "./Routes/users.routes";

//create a new express server
const AppServer = express();

// set a new port and type of http request
AppServer.set("port", 4001);
AppServer.use(express.json());

// API ENDPOINTS
AppServer.use("/api/v1/users", UserRouter)


//export the appserver
export default AppServer;


