import Router from "express";
import { CategoryController } from "../Controllers/category.controllers";
import { CategoryService } from "../Services/category.services";
import { CategoryRepository } from "../Repositories/category.repositories";

//create routers for all the endpoints
const CategoryRouter = Router();


// inyection the dependencies
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
//instance a new controllers
const controller = new CategoryController(categoryService);



/**
 * GET  /api/v1/settings/getCategorys                  ------>(gets all Category)
 * return a list of the Categorys
 */
CategoryRouter.get("/getCategories/:CompanyID", controller.GetCategories.bind(controller));

/**
 * GET  /api/v1/settings/getCategory/:CategoryID         ------>(gets a single Category)
 * return an specific Category
 */
CategoryRouter.get("/getCategory/:CompanyID/:CategoryID", controller.GetCategory.bind(controller));

// /**
//  * POST /api/v1/settings/createCategory                 ------>(create a new Category)
//  * save a Category, return the CategoryID
//  */
CategoryRouter.post("/createCategory", controller.CreateCategory.bind(controller));

// /**
//  * PUT  /api/v1/settings/editCategory/:CategoryID        ------>(update a Category)
//  * update the Category, return the changes applied return the CategoryID
//  */
CategoryRouter.put("/updateCategory/:CompanyID/:CategoryID", controller.UpdateCategory.bind(controller));



//export the router
export default CategoryRouter;