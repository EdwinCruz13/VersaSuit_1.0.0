import Router from "express";
import { ProductController } from "../Controllers/product.controllers";
import { ProductRepository } from "../Repositories/product.repositories";
import { ProductService } from "../Services/product.services";

//create routers for all the endpoints
const ProductRouter = Router();


// inyection the dependencies
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
//instance a new controllers
const controller = new ProductController(productService);


/**
 * GET  /api/v1/products/getproducts                  ------>(gets all product)
 * return a list of the products
 */
ProductRouter.get("/getproducts/:CompanyID/", controller.GetProducts.bind(controller));

/**
 * GET  /api/v1/products/getproduct/:productID         ------>(gets a single product)
 * return an specific product
 */
ProductRouter.get("/getproduct/:CompanyID/:ProductID", controller.GetProduct.bind(controller));

// /**
//  * POST /api/v1/products/createproduct                 ------>(create a new product)
//  * save a product, return the productID
//  */
ProductRouter.post("/createproduct", controller.CreateProduct.bind(controller));

// /**
//  * PUT  /api/v1/products/editproduct/:productID        ------>(update a product)
//  * update the product, return the changes applied return the productID
//  */
ProductRouter.put("/updateproduct/:CompanyID/:productID", controller.UpdateProduct.bind(controller));



//export the router
export default ProductRouter;