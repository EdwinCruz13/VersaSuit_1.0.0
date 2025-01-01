import { Request, Response } from "express";
import { SubCategoryService } from "../Services/subcategory.services";


/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class SubCategoryController {
 
  /**
   * class tha communicates with services
   */
  private SubCategoryService: SubCategoryService;
          
  /**
  * use the inyection pattern
  * @param _categoryService 
  */
  constructor(service: SubCategoryService) {
    this.SubCategoryService = service;
  }

  /**
   * method http for get SubCategorys
   * return the list of SubCategorys in https
   * @param req
   * @param resp
   */
  async GetSubCategories(req: Request, resp: Response): Promise<any> {
    const { CompanyID }  = req.params
    try {
      //get data from services
      const SubCategories = await this.SubCategoryService.GetAll(Number(CompanyID));

      //validate
      if (!SubCategories || SubCategories.length ===0)
        return resp.sendResponse(null, "There are not SubCategories saved", false, 200)

      //return the list
      return resp.sendResponse(SubCategories, "The SubCategories have been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the SubCategories: " + error, true, 500)
    }
  }

  /**
   * return a especific SubCategory
   * @param req
   * @param resp
   */
  async GetSubCategory(req: Request, resp: Response): Promise<any> {
    const { CompanyID, SubCategoryID } = req.params;
    try {
      //get data from services
      const SubCategory = await this.SubCategoryService.GetByID(Number(CompanyID), Number(SubCategoryID));
      //validate the result, in any case is null, send status 409
      if (!SubCategory) {
        return resp.sendResponse(null, "The SubCategory has not been found", false, 200)
      }

      //return the list
      return resp.sendResponse(SubCategory, "The SubCategory has been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the SubCategorys: " + error, true, 500)
    }
  }

  /**
   * this method create a new SubCategory
   * the main SubCategory automatically create the main branch
   * @param req
   * @param res
   */
  async CreateSubCategory(req: Request, resp: Response): Promise<any> {
    const { subcategory } = req.body;
    try {
      const result = await this.SubCategoryService.Create(subcategory);
      if (!result.data)
        return resp.sendResponse(null, "There is a problem creating a SubCategory: " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "The SubCategory has been created", false, 201);
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error creating the SubCategory: " + error, true, 500)
    }
  }

  /**
   * this method update the an specific SubCategory
   * @param req 
   * @param resp 
   * @returns 
   */
  async UpdateSubCategory(req: Request, resp: Response): Promise<any> {
    const { subcategory } = req.body;
    try {
      //save to SubCategory 
      const result = await this.SubCategoryService.Update(subcategory);

      //validate
      if (!result.data)
        return resp.sendResponse(null, "There is a problem editing a SubCategory: " + result.Message, true, 409);

      else
        return resp.sendResponse(result.data, "The SubCategory has been saved", false, 201);

    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error editing the SubCategory: " + error, true, 500)
    }
  }
}