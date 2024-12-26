import { Request, Response } from "express";
import { LineTypeService } from "../Services/line.services";


/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class LineTypeController {
 
  private LineTypeService = new LineTypeService();

  /**
   * method http for get LineTypes
   * return the list of LineTypes in https
   * @param req
   * @param resp
   */
  async GetLineTypes(req: Request, resp: Response): Promise<any> {
    const { CompanyID }  = req.params
    try {
      //get data from services
      const LineTypes = await this.LineTypeService.GetAll(Number(CompanyID));

      //validate
      if (!LineTypes || LineTypes.length ===0)
        return resp.sendResponse(null, "There are not LineTypes saved", false, 200)

      //return the list
      return resp.sendResponse(LineTypes, "The LineTypes have been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the LineTypes: " + error, true, 500)
    }
  }

  /**
   * return a especific LineType
   * @param req
   * @param resp
   */
  async GetLineType(req: Request, resp: Response): Promise<any> {
    const { LineID, CompanyID } = req.params;
    try {
      //get data from services
      const LineType = await this.LineTypeService.GetByID(Number(CompanyID), Number(LineID));
      //validate the result, in any case is null, send status 409
      if (!LineType) {
        return resp.sendResponse(null, "The LineType has not been found", false, 200)
      }

      //return the list
      return resp.sendResponse(LineType, "The LineType has been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the LineTypes: " + error, true, 500)
    }
  }

  /**
   * this method create a new LineType
   * the main LineType automatically create the main branch
   * @param req
   * @param res
   */
  async CreateLineType(req: Request, resp: Response): Promise<any> {
    const { linetype } = req.body;
    try {
      const result = await this.LineTypeService.Create(linetype);
      if (!result.data)
        return resp.sendResponse(null, "There is a problem creating a LineType: " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "The LineType has been created", false, 201);
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error creating the LineType: " + error, true, 500)
    }
  }

  /**
   * this method update the an specific LineType
   * @param req 
   * @param resp 
   * @returns 
   */
  async UpdateLineType(req: Request, resp: Response): Promise<any> {
    const { linetype } = req.body;
    console.log(req.body)
    try {
      //save to LineType 
      const result = await this.LineTypeService.Update(linetype);

      //validate
      if (!result.data)
        return resp.sendResponse(null, "There is a problem editing a LineType: " + result.Message, true, 409);

      else
        return resp.sendResponse(result.data, "The LineType has been saved", false, 201);

    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error editing the LineType: " + error, true, 500)
    }
  }
}