import Router from "express";
import { ColorController } from "../Controllers/color.controllers";
import { ColorRepository } from "../Repositories/color.repository";
import { ColorService } from "../Services/color.services";

//create routers for all the endpoints
const ColorRouter = Router();


// inyection the dependencies
const colorRespository = new ColorRepository();
const colorService = new ColorService(colorRespository);
const controller = new ColorController(colorService);


/**
 * GET  /api/v1/settings/getColors                  ------>(gets all Color)
 * return a list of the Colors
 */
ColorRouter.get("/getColors", controller.GetColors.bind(controller));

/**
 * GET  /api/v1/settings/getColor/:ColorID         ------>(gets a single Color)
 * return an specific Color
 */
ColorRouter.get("/getColor/:ColorID", controller.GetColor.bind(controller));

// /**
//  * POST /api/v1/settings/createColor                 ------>(create a new Color)
//  * save a Color, return the ColorID
//  */
ColorRouter.post("/createColor", controller.CreateColor.bind(controller));

// /**
//  * PUT  /api/v1/settings/editColor/:ColorID        ------>(update a Color)
//  * update the Color, return the changes applied return the ColorID
//  */
ColorRouter.put("/updateColor/:ColorID", controller.UpdateColor.bind(controller));



//export the router
export default ColorRouter;