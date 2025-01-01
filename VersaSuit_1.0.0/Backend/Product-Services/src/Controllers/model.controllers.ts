import { Request, Response } from "express";
import { ModelService } from "../Services/model.services";


/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class ModelController {
 
  private ModelService: ModelService;
        
      /**
      * use the inyection pattern
      * @param _categoryService 
      */
      constructor(service: ModelService) {
        this.ModelService = service;
      }

  /**
   * method http for get Models
   * return the list of Models in https
   * @param req
   * @param resp
   */
  async GetModels(req: Request, resp: Response): Promise<any> {
    const { CompanyID }  = req.params
    try {
      //get data from services
      const Models = await this.ModelService.GetAll(Number(CompanyID));

      //validate
      if (!Models || Models.length ===0)
        return resp.sendResponse(null, "There are not Models saved", false, 200)

      //return the list
      return resp.sendResponse(Models, "The Models have been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the Models: " + error, true, 500)
    }
  }

  /**
   * return a especific Model
   * @param req
   * @param resp
   */
  async GetModel(req: Request, resp: Response): Promise<any> {
    const { ModelID, CompanyID } = req.params;
    try {
      //get data from services
      const Model = await this.ModelService.GetByID(Number(CompanyID), Number(ModelID));
      //validate the result, in any case is null, send status 409
      if (!Model) {
        return resp.sendResponse(null, "The Model has not been found", false, 200)
      }

      //return the list
      return resp.sendResponse(Model, "The Model has been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the Models: " + error, true, 500)
    }
  }

  /**
   * this method create a new Model
   * the main Model automatically create the main branch
   * @param req
   * @param res
   */
  async CreateModel(req: Request, resp: Response): Promise<any> {
    const { model } = req.body;
    try {
      const result = await this.ModelService.Create(model);
      if (!result.data)
        return resp.sendResponse(null, "There is a problem creating a Model: " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "the Model has been created", false, 201);
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error creating the Model: " + error, true, 500)
    }
  }

  /**
   * this method update the an specific Model
   * @param req 
   * @param resp 
   * @returns 
   */
  async UpdateModel(req: Request, resp: Response): Promise<any> {
    const { model } = req.body;
    try {
      //save to Model 
      const result = await this.ModelService.Update(model);

      //validate
      if (!result.data)
        return resp.sendResponse(null, "There is a problem editing a Model: " + result.Message, true, 409);

      else
        return resp.sendResponse(result.data, "he Model has been updated", false, 201);

    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error editing the Model: " + error, true, 500)
    }
  }
}