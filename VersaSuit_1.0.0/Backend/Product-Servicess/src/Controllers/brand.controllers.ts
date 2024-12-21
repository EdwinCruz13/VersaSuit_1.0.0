import { Request, Response } from "express";

/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class BrandController {
 
  /**
   * method http for get brands
   * return the list of brands in https
   * @param req
   * @param resp
   */
  async Getbrands(req: Request, resp: Response): Promise<any> {
    try {
      const brands = [{}];
      if (!brands)
        return resp.sendResponse(null, "There are not brands saved", false, 200)

      //return the list
      return resp.sendResponse(brands, "The brands have been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the brands: " + error, true, 500)
    }
  }

  /**
   * return a especific brand
   * @param req
   * @param resp
   */
  async Getbrand(req: Request, resp: Response): Promise<any> {
    const { brandID } = req.params;
    try {
      const brand = {};

      
      //validate the result, in any case is null, send status 409
      if (!brand) {
        return resp.sendResponse(null, "The brand has not been found", false, 200)
      }

      //return the list
      return resp.sendResponse(brand, "The brand has been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the brands: " + error, true, 500)
    }
  }

  /**
   * this method create a new brand
   * the main brand automatically create the main branch
   * @param req
   * @param res
   */
  async Createbrand(req: Request, resp: Response): Promise<any> {
    const { brand } = req.body;
    try {
      const result = {data: 0, Message:""};
      if (result.data == 0)
        return resp.sendResponse(null, "There is a problem creating a brand: " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "he brand has been created", false, 201);
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error creating the brand: " + error, true, 500)
    }
  }

  /**
   * this method update the an specific brand
   * @param req 
   * @param resp 
   * @returns 
   */
  async Updatebrand(req: Request, resp: Response): Promise<any> {
    const { brand } = req.body;

    try {
      const result = {data: {}, Message: ""};
      if (result.Message.includes("already exists"))
        return resp.sendResponse(null, "There is a problem editing a brand: " + result.Message, true, 409);

      else
        return resp.sendResponse(result.data, "he brand has been saved", false, 201);

    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error editing the brand: " + error, true, 500)
    }
  }
}