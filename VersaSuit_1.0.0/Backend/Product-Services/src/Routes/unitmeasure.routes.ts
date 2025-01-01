import Router from "express";
import { UnitMeasureController } from "../Controllers/unitmeasure.controllers";
import { UnitMeasureRepository } from "../Repositories/unitmeasure.repositories";
import { UnitMeasureService } from "../Services/unitmeasure.services";

//create routers for all the endpoints
const UnitMeasureRouter = Router();


// inyection the dependencies
const UnitRepository = new UnitMeasureRepository();
const UnitService = new UnitMeasureService(UnitRepository);
//instance a new controllers
const controller = new UnitMeasureController(UnitService);


/**
 * GET  /api/v1/settings/getUnitMeasures                  ------>(gets all UnitMeasure)
 * return a list of the UnitMeasures
 */
UnitMeasureRouter.get("/getUnitMeasures", controller.GetUnitMeasures.bind(controller));

/**
 * GET  /api/v1/settings/getUnitMeasure/:UnitMeasureID         ------>(gets a single UnitMeasure)
 * return an specific UnitMeasure
 */
UnitMeasureRouter.get("/getUnitMeasure/:UnitMeasureID", controller.GetUnitMeasure.bind(controller));

// /**
//  * POST /api/v1/settings/createUnitMeasure                 ------>(create a new UnitMeasure)
//  * save a UnitMeasure, return the UnitMeasureID
//  */
UnitMeasureRouter.post("/createUnitMeasure", controller.CreateUnitMeasure.bind(controller));

// /**
//  * PUT  /api/v1/settings/editUnitMeasure/:UnitMeasureID        ------>(update a UnitMeasure)
//  * update the UnitMeasure, return the changes applied return the UnitMeasureID
//  */
UnitMeasureRouter.put("/updateUnitMeasure/:UnitMeasureID", controller.UpdateUnitMeasure.bind(controller));



//export the router
export default UnitMeasureRouter;