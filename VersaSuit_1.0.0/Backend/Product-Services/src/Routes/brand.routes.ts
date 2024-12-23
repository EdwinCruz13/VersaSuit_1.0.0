import Router from "express";
import { BrandController } from "../Controllers/brand.controllers";

//create routers for all the endpoints
const brandRouter = Router();


//initializa the controller
const controller = new BrandController();


/**
 * GET  /api/v1/settings/getbrands                  ------>(gets all brand)
 * return a list of the brands
 */
brandRouter.get("/getbrands/:CompanyID", controller.Getbrands.bind(controller));

/**
 * GET  /api/v1/settings/getbrand/:brandID         ------>(gets a single brand)
 * return an specific brand
 */
brandRouter.get("/getbrand/:CompanyID/:BrandID", controller.Getbrand.bind(controller));

// /**
//  * POST /api/v1/settings/createbrand                 ------>(create a new brand)
//  * save a brand, return the brandID
//  */
brandRouter.post("/createbrand", controller.Createbrand.bind(controller));

// /**
//  * PUT  /api/v1/settings/editbrand/:brandID        ------>(update a brand)
//  * update the brand, return the changes applied return the brandID
//  */
brandRouter.put("/updatebrand/:CompanyID/:BrandID", controller.Updatebrand.bind(controller));



//export the router
export default brandRouter;