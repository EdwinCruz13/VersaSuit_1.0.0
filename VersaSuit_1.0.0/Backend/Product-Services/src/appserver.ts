import express from "express";

//import routers from route module
import ProductRouter from "./Routes/product.routes";
import BrandRouter from "./Routes/brand.routes";
import ModelRouter from "./Routes/model.routes";
import ColorRouter from "./Routes/color.routes";
import UnitMeasureRouter from "./Routes/unitmeasure.routes";
import CategoryRouter from "./Routes/category.routes";

//use this middleware in order to create an schema for response
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
AppServer.use("/api/v1/products/models", ModelRouter)
AppServer.use("/api/v1/products/colors", ColorRouter)
AppServer.use("/api/v1/products/unitmeasure", UnitMeasureRouter)
AppServer.use("/api/v1/products/categories", CategoryRouter)

//export the appserver
export default AppServer;


