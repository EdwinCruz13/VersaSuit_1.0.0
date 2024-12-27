import Router from "express";
import { SubCategoryController } from "../Controllers/subcategory.controllers";

//create routers for all the endpoints
const SubCategoryRouter = Router();


//initializa the controller
const controller = new SubCategoryController();


/**
 * GET  /api/v1/settings/getSubCategorys                  ------>(gets all SubCategory)
 * return a list of the SubCategorys
 */
SubCategoryRouter.get("/getSubCategories/:CompanyID", controller.GetSubCategories.bind(controller));

/**
 * GET  /api/v1/settings/getSubCategory/:SubCategoryID         ------>(gets a single SubCategory)
 * return an specific SubCategory
 */
SubCategoryRouter.get("/getSubCategory/:CompanyID/:SubCategoryID", controller.GetSubCategory.bind(controller));

// /**
//  * POST /api/v1/settings/createSubCategory                 ------>(create a new SubCategory)
//  * save a SubCategory, return the SubCategoryID
//  */
SubCategoryRouter.post("/createSubCategory", controller.CreateSubCategory.bind(controller));

// /**
//  * PUT  /api/v1/settings/editSubCategory/:SubCategoryID        ------>(update a SubCategory)
//  * update the SubCategory, return the changes applied return the SubCategoryID
//  */
SubCategoryRouter.put("/updateSubCategory/:CompanyID/:SubCategoryID", controller.UpdateSubCategory.bind(controller));



//export the router
export default SubCategoryRouter;