import { Request, Response } from "express";
import { BrandService } from "../Services/brand.services";


/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class BrandController {
 
  private BrandService: BrandService;
  
    /**
     * use the inyection pattern
     * @param _categoryService 
     */
    constructor(service: BrandService) {
          this.BrandService = service;
    }

  /**
   * method http for get brands
   * return the list of brands in https
   * @param req
   * @param resp
   */
  async Getbrands(req: Request, resp: Response): Promise<any> {
    const { CompanyID }  = req.params
    try {
      //get data from services
      const brands = await this.BrandService.GetAll(Number(CompanyID));

      //validate
      if (!brands || brands.length ===0)
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
    const { BrandID, CompanyID } = req.params;
    try {
      //get data from services
      const brand = await this.BrandService.GetByID(Number(CompanyID), Number(BrandID));
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
      const result = await this.BrandService.Create(brand);
      if (!result.data)
        return resp.sendResponse(null, "There is a problem creating a brand: " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "The brand has been created", false, 201);
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
      //save to brand 
      const result = await this.BrandService.Update(brand);

      //validate
      if (!result.data)
        return resp.sendResponse(null, "There is a problem editing a brand: " + result.Message, true, 409);

      else
        return resp.sendResponse(result.data, "The brand has been saved", false, 201);

    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error editing the brand: " + error, true, 500)
    }
  }
}