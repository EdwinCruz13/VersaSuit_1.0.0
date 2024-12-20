import { Request, Response } from "express";

/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class productController {
 
  /**
   * method http for get products
   * return the list of products in https
   * @param req
   * @param resp
   */
  async GetProducts(req: Request, resp: Response): Promise<any> {
    try {
      const products = [{}];
      if (!products)
        return resp.sendResponse(null, "There are not products saved", false, 200)

      //return the list
      return resp.sendResponse(products, "The products have been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the products: " + error, true, 500)
    }
  }

  /**
   * return a especific product
   * @param req
   * @param resp
   */
  async GetProduct(req: Request, resp: Response): Promise<any> {
    const { productID } = req.params;
    try {
      const product = {};

      
      //validate the result, in any case is null, send status 409
      if (!product) {
        return resp.sendResponse(null, "The product has not been found", false, 200)
      }

      //return the list
      return resp.sendResponse(product, "The product has been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the products: " + error, true, 500)
    }
  }

  /**
   * this method create a new product
   * the main product automatically create the main branch
   * @param req
   * @param res
   */
  async CreateProduct(req: Request, resp: Response): Promise<any> {
    const { product } = req.body;
    try {
      const result = {data: 0, Message:""};
      if (result.data == 0)
        return resp.sendResponse(null, "There is a problem creating a product: " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "he product has been created", false, 201);
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error creating the product: " + error, true, 500)
    }
  }

  /**
   * this method update the an specific product
   * @param req 
   * @param resp 
   * @returns 
   */
  async UpdateProduct(req: Request, resp: Response): Promise<any> {
    const { product } = req.body;

    try {
      const result = {data: {}, Message: ""};
      if (result.Message.includes("already exists"))
        return resp.sendResponse(null, "There is a problem editing a product: " + result.Message, true, 409);

      else
        return resp.sendResponse(result.data, "he product has been saved", false, 201);

    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error editing the product: " + error, true, 500)
    }
  }
}