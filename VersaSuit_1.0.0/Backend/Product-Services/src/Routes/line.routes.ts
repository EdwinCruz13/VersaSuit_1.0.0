import Router from "express";
import { LineTypeController } from "../Controllers/line.controllers";

//create routers for all the endpoints
const LineTypeRouter = Router();


//initializa the controller
const controller = new LineTypeController();


/**
 * GET  /api/v1/settings/getLineTypes                  ------>(gets all LineType)
 * return a list of the LineTypes
 */
LineTypeRouter.get("/getLines/:CompanyID", controller.GetLineTypes.bind(controller));

/**
 * GET  /api/v1/settings/getLineType/:LineTypeID         ------>(gets a single LineType)
 * return an specific LineType
 */
LineTypeRouter.get("/getLine/:CompanyID/:LineID", controller.GetLineType.bind(controller));

// /**
//  * POST /api/v1/settings/createLineType                 ------>(create a new LineType)
//  * save a LineType, return the LineTypeID
//  */
LineTypeRouter.post("/createLine", controller.CreateLineType.bind(controller));

// /**
//  * PUT  /api/v1/settings/editLineType/:LineTypeID        ------>(update a LineType)
//  * update the LineType, return the changes applied return the LineTypeID
//  */
LineTypeRouter.put("/updateLine/:CompanyID/:LineID", controller.UpdateLineType.bind(controller));



//export the router
export default LineTypeRouter;