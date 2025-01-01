import Router from "express";
import { SuperCategoryController } from "../Controllers/supercategory.controllers";
import { SuperCategoryRepository } from "../Repositories/supercategory.repositories";
import { SuperCategoryService } from "../Services/supercategory.services";

//create routers for all the endpoints
const SuperCategoryRouter = Router();


// inyection the dependencies
const superCategoryRepository = new SuperCategoryRepository();
const superCategoryService = new SuperCategoryService(superCategoryRepository);
//instance a new controllers
const controller = new SuperCategoryController(superCategoryService);


/**
 * GET  /api/v1/settings/getSuperCategorys                  ------>(gets all SuperCategory)
 * return a list of the SuperCategorys
 */
SuperCategoryRouter.get("/getSuperCategories/:CompanyID", controller.GetSuperCategories.bind(controller));

/**
 * GET  /api/v1/settings/getSuperCategory/:SuperCategoryID         ------>(gets a single SuperCategory)
 * return an specific SuperCategory
 */
SuperCategoryRouter.get("/getSuperCategory/:CompanyID/:SuperCategoryID", controller.GetSuperCategory.bind(controller));

// /**
//  * POST /api/v1/settings/createSuperCategory                 ------>(create a new SuperCategory)
//  * save a SuperCategory, return the SuperCategoryID
//  */
SuperCategoryRouter.post("/createSuperCategory", controller.CreateSuperCategory.bind(controller));

// /**
//  * PUT  /api/v1/settings/editSuperCategory/:SuperCategoryID        ------>(update a SuperCategory)
//  * update the SuperCategory, return the changes applied return the SuperCategoryID
//  */
SuperCategoryRouter.put("/updateSuperCategory/:CompanyID/:SuperCategoryID", controller.UpdateSuperCategory.bind(controller));



//export the router
export default SuperCategoryRouter;