import { Request, Response } from "express";
import { ColorService } from "../Services/color.services";


/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class ColorController {
 
  private ColorService = new ColorService();

  /**
   * method http for get Colors
   * return the list of Colors in https
   * @param req
   * @param resp
   */
  async GetColors(req: Request, resp: Response): Promise<any> {
    try {
      //get data from services
      const Colors = await this.ColorService.GetAll();

      //validate
      if (!Colors || Colors.length ===0)
        return resp.sendResponse(null, "There are not Colors saved", false, 200)

      //return the list
      return resp.sendResponse(Colors, "The Colors have been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the Colors: " + error, true, 500)
    }
  }

  /**
   * return a especific Color
   * @param req
   * @param resp
   */
  async GetColor(req: Request, resp: Response): Promise<any> {
    const { ColorID, CompanyID } = req.params;
    try {
      //get data from services
      const Color = await this.ColorService.GetByID(Number(ColorID));
      //validate the result, in any case is null, send status 409
      if (!Color) {
        return resp.sendResponse(null, "The Color has not been found", false, 200)
      }

      //return the list
      return resp.sendResponse(Color, "The Color has been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the Colors: " + error, true, 500)
    }
  }

  /**
   * this method create a new Color
   * the main Color automatically create the main branch
   * @param req
   * @param res
   */
  async CreateColor(req: Request, resp: Response): Promise<any> {
    const { color } = req.body;
    try {
      const result = await this.ColorService.Create(color);
      if (!result.data)
        return resp.sendResponse(null, "There is a problem creating a Color: " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "the Color has been created", false, 201);
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error creating the Color: " + error, true, 500)
    }
  }

  /**
   * this method update the an specific Color
   * @param req 
   * @param resp 
   * @returns 
   */
  async UpdateColor(req: Request, resp: Response): Promise<any> {
    const { color } = req.body;
    try {
      //save to Color 
      const result = await this.ColorService.Update(color);

      //validate
      if (!result.data)
        return resp.sendResponse(null, "There is a problem editing a Color: " + result.Message, true, 409);

      else
        return resp.sendResponse(result.data, "The Color has been updated", false, 201);

    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error editing the Color: " + error, true, 500)
    }
  }
}