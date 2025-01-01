import { Request, Response } from "express";
import { CategoryService } from "../Services/category.services";


/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class CategoryController {
  private CategoryService: CategoryService;

  /**
   * use the inyection pattern
   * @param _categoryService 
   */
  constructor(service: CategoryService) {
        this.CategoryService = service;
  }

  /**
   * method http for get Categories
   * return the list of Categories in https
   * @param req
   * @param resp
   */
  async GetCategories(req: Request, resp: Response): Promise<any> {
    const { CompanyID }  = req.params
    try {
      //get data from services
      const Categorys = await this.CategoryService.GetAll(Number(CompanyID));

      //validate
      if (!Categorys || Categorys.length ===0)
        return resp.sendResponse(null, "There are not Categories saved", false, 200)

      //return the list
      return resp.sendResponse(Categorys, "The Categories have been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the Categories: " + error, true, 500)
    }
  }

  /**
   * return a especific Category
   * @param req
   * @param resp
   */
  async GetCategory(req: Request, resp: Response): Promise<any> {
    const { CategoryID, CompanyID } = req.params;
    try {
      //get data from services
      const Category = await this.CategoryService.GetByID(Number(CompanyID), Number(CategoryID));
      //validate the result, in any case is null, send status 409
      if (!Category) {
        return resp.sendResponse(null, "The Category has not been found", false, 200)
      }

      //return the list
      return resp.sendResponse(Category, "The Category has been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the Categorys: " + error, true, 500)
    }
  }

  /**
   * this method create a new Category
   * the main Category automatically create the main branch
   * @param req
   * @param res
   */
  async CreateCategory(req: Request, resp: Response): Promise<any> {
    const { category } = req.body;
    try {
      const result = await this.CategoryService.Create(category);
      if (!result.data)
        return resp.sendResponse(null, "There is a problem creating a Category: " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "he Category has been created", false, 201);
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error creating the Category: " + error, true, 500)
    }
  }

  /**
   * this method update the an specific Category
   * @param req 
   * @param resp 
   * @returns 
   */
  async UpdateCategory(req: Request, resp: Response): Promise<any> {
    const { category } = req.body;
    try {
      //save to Category 
      const result = await this.CategoryService.Update(category);

      //validate
      if (!result.data)
        return resp.sendResponse(null, "There is a problem editing a Category: " + result.Message, true, 409);

      else
        return resp.sendResponse(result.data, "he Category has been saved", false, 201);

    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error editing the Category: " + error, true, 500)
    }
  }
}