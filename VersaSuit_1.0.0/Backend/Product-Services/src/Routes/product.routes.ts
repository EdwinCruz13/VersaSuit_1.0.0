import Router from "express";
import { ProductController } from "../Controllers/product.controllers";

//create routers for all the endpoints
const ProductRouter = Router();


//initializa the controller
const controller = new ProductController();


/**
 * GET  /api/v1/settings/getproducts                  ------>(gets all product)
 * return a list of the products
 */
ProductRouter.get("/getproducts/:CompanyID/", controller.GetProducts.bind(controller));

/**
 * GET  /api/v1/settings/getproduct/:productID         ------>(gets a single product)
 * return an specific product
 */
ProductRouter.get("/getproduct/:CompanyID/:ProductID", controller.GetProduct.bind(controller));

// // /**
// //  * POST /api/v1/settings/createproduct                 ------>(create a new product)
// //  * save a product, return the productID
// //  */
// ProductRouter.post("/createproduct", controller.CreateProduct.bind(controller));

// // /**
// //  * PUT  /api/v1/settings/editproduct/:productID        ------>(update a product)
// //  * update the product, return the changes applied return the productID
// //  */
// ProductRouter.put("/updateproduct/:productID", controller.UpdateProduct.bind(controller));



//export the router
export default ProductRouter;