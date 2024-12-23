import { Request, Response } from "express";
import { UnitMeasureService } from "../Services/unitmeasure.services";


/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class UnitMeasureController {
 
  private UnitMeasureService = new UnitMeasureService();

  /**
   * method http for get UnitMeasures
   * return the list of UnitMeasures in https
   * @param req
   * @param resp
   */
  async GetUnitMeasures(req: Request, resp: Response): Promise<any> {
    try {
      //get data from services
      const UnitMeasures = await this.UnitMeasureService.GetAll();

      //validate
      if (!UnitMeasures || UnitMeasures.length ===0)
        return resp.sendResponse(null, "There are not UnitMeasures saved", false, 200)

      //return the list
      return resp.sendResponse(UnitMeasures, "The UnitMeasures have been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the UnitMeasures: " + error, true, 500)
    }
  }

  /**
   * return a especific UnitMeasure
   * @param req
   * @param resp
   */
  async GetUnitMeasure(req: Request, resp: Response): Promise<any> {
    const { UnitMeasureID, CompanyID } = req.params;
    try {
      //get data from services
      const UnitMeasure = await this.UnitMeasureService.GetByID(Number(UnitMeasureID));
      //validate the result, in any case is null, send status 409
      if (!UnitMeasure) {
        return resp.sendResponse(null, "The UnitMeasure has not been found", false, 200)
      }

      //return the list
      return resp.sendResponse(UnitMeasure, "The UnitMeasure has been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the UnitMeasures: " + error, true, 500)
    }
  }

  /**
   * this method create a new UnitMeasure
   * the main UnitMeasure automatically create the main branch
   * @param req
   * @param res
   */
  async CreateUnitMeasure(req: Request, resp: Response): Promise<any> {
    const { unitmeasure } = req.body;
    try {
      const result = await this.UnitMeasureService.Create(unitmeasure);
      if (!result.data)
        return resp.sendResponse(null, "There is a problem creating a UnitMeasure: " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "the UnitMeasure has been created", false, 201);
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error creating the UnitMeasure: " + error, true, 500)
    }
  }

  /**
   * this method update the an specific UnitMeasure
   * @param req 
   * @param resp 
   * @returns 
   */
  async UpdateUnitMeasure(req: Request, resp: Response): Promise<any> {
    const { unitmeasure } = req.body;
    try {
      //save to UnitMeasure 
      const result = await this.UnitMeasureService.Update(unitmeasure);

      //validate
      if (!result.data)
        return resp.sendResponse(null, "There is a problem editing a UnitMeasure: " + result.Message, true, 409);

      else
        return resp.sendResponse(result.data, "The UnitMeasure has been updated", false, 201);

    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error editing the UnitMeasure: " + error, true, 500)
    }
  }
}