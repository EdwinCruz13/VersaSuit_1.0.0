import { Request, Response } from "express";
import { SuperCategoryService } from "../Services/supercategory.services";


/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class SuperCategoryController {
 
  private SuperCategoryService = new SuperCategoryService();

  /**
   * method http for get SuperCategorys
   * return the list of SuperCategorys in https
   * @param req
   * @param resp
   */
  async GetSuperCategories(req: Request, resp: Response): Promise<any> {
    const { CompanyID }  = req.params
    try {
      //get data from services
      const SubCategories = await this.SuperCategoryService.GetAll(Number(CompanyID));

      //validate
      if (!SubCategories || SubCategories.length ===0)
        return resp.sendResponse(null, "There are not SuperCategories saved", false, 200)

      //return the list
      return resp.sendResponse(SubCategories, "The SuperCategories have been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the SuperCategories: " + error, true, 500)
    }
  }

  /**
   * return a especific SuperCategory
   * @param req
   * @param resp
   */
  async GetSuperCategory(req: Request, resp: Response): Promise<any> {
    const { CompanyID, SuperCategoryID } = req.params;
    try {
      //get data from services
      const SuperCategory = await this.SuperCategoryService.GetByID(Number(CompanyID), Number(SuperCategoryID));
      //validate the result, in any case is null, send status 409
      if (!SuperCategory) {
        return resp.sendResponse(null, "The SuperCategory has not been found", false, 200)
      }

      //return the list
      return resp.sendResponse(SuperCategory, "The SuperCategory has been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the SuperCategory: " + error, true, 500)
    }
  }

  /**
   * this method create a new SuperCategory
   * the main SuperCategory automatically create the main branch
   * @param req
   * @param res
   */
  async CreateSuperCategory(req: Request, resp: Response): Promise<any> {
    const { supercategory } = req.body;
    try {
      const result = await this.SuperCategoryService.Create(supercategory);
      if (!result.data)
        return resp.sendResponse(null, "There is a problem creating a SuperCategory: " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "The SuperCategory has been created", false, 201);
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error creating the SuperCategory: " + error, true, 500)
    }
  }

  /**
   * this method update the an specific SuperCategory
   * @param req 
   * @param resp 
   * @returns 
   */
  async UpdateSuperCategory(req: Request, resp: Response): Promise<any> {
    const { supercategory } = req.body;
    try {
      //save to SuperCategory 
      const result = await this.SuperCategoryService.Update(supercategory);

      //validate
      if (!result.data)
        return resp.sendResponse(null, "There is a problem editing a SuperCategory: " + result.Message, true, 409);

      else
        return resp.sendResponse(result.data, "The SuperCategory has been saved", false, 201);

    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error editing the SuperCategory: " + error, true, 500)
    }
  }
}