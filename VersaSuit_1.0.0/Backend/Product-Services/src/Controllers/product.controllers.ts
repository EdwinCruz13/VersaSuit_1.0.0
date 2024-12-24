import { Request, Response } from "express";
import { ProductService } from "../Services/product.services";


/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class ProductController {
  /**
   * class tha communicates with services
   */
  private ProductService = new ProductService();

  /**
   * method http for get Products
   * return the list of Products in https
   * @param req
   * @param resp
   */
  async GetProducts(req: Request, resp: Response): Promise<any> {
    const { CompanyID }  = req.params
    try {
      //get data from services
      const Products = await this.ProductService.GetAll(Number(CompanyID));

      //validate
      if (!Products || Products.length ===0)
        return resp.sendResponse(null, "There are not Products saved", false, 200)

      //return the list
      return resp.sendResponse(Products, "The Products have been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the Products: " + error, true, 500)
    }
  }

  /**
   * return a especific Product
   * @param req
   * @param resp
   */
  async GetProduct(req: Request, resp: Response): Promise<any> {
    const { ProductID, CompanyID } = req.params;
    try {
      //get data from services
      const Product = await this.ProductService.GetByID(Number(CompanyID), Number(ProductID));
      //validate the result, in any case is null, send status 409
      if (!Product) {
        return resp.sendResponse(null, "The Product has not been found", false, 200)
      }

      //return the list
      return resp.sendResponse(Product, "The Product has been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the Products: " + error, true, 500)
    }
  }

  // /**
  //  * this method create a new Product
  //  * the main Product automatically create the main branch
  //  * @param req
  //  * @param res
  //  */
  // async CreateProduct(req: Request, resp: Response): Promise<any> {
  //   const { product } = req.body;
  //   try {
  //     const result = await this.ProductService.Create(Product);
  //     if (!result.data)
  //       return resp.sendResponse(null, "There is a problem creating a Product: " + result.Message, true, 409);
  //     else
  //       return resp.sendResponse(result.data, "The Product has been created", false, 201);
  //   } catch (error) {
  //     return resp.sendResponse(null, "There is a fatal error creating the Product: " + error, true, 500)
  //   }
  // }

  // /**
  //  * this method update the an specific Product
  //  * @param req 
  //  * @param resp 
  //  * @returns 
  //  */
  // async UpdateProduct(req: Request, resp: Response): Promise<any> {
  //   const { product } = req.body;
  //   try {
  //     //save to Product 
  //     const result = await this.ProductService.Update(Product);

  //     //validate
  //     if (!result.data)
  //       return resp.sendResponse(null, "There is a problem editing a Product: " + result.Message, true, 409);

  //     else
  //       return resp.sendResponse(result.data, "The Product has been saved", false, 201);

  //   } catch (error) {
  //     return resp.sendResponse(null, "There is a fatal error editing the Product: " + error, true, 500)
  //   }
  // }
}