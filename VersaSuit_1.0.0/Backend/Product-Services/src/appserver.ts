import express from "express";

//import routers from route module
import ProductRouter from "./Routes/product.routes";
import BrandRouter from "./Routes/brand.routes";

import responseMiddleware from "./Middleware/response.middleware";

//create a new express server
const AppServer = express();

// set a new port and type of http request
AppServer.set("port", 4002);
AppServer.use(express.json());

//Middleware
AppServer.use(responseMiddleware); //this middleware will help to manage the http response

// API ENDPOINTS
AppServer.use("/api/v1/products", ProductRouter)
AppServer.use("/api/v1/products/brands", BrandRouter)


//export the appserver
export default AppServer;


