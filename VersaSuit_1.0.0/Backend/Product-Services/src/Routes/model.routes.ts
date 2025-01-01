import Router from "express";
import { ModelController } from "../Controllers/model.controllers";
import { ModelRepository } from "../Repositories/model.repositories";
import { ModelService } from "../Services/model.services";

//create routers for all the endpoints
const ModelRouter = Router();

// inyection the dependencies
const modelRespository = new ModelRepository();
const modelService = new ModelService(modelRespository);
//initializa the controller
//initializa the controller
const controller = new ModelController(modelService);


/**
 * GET  /api/v1/settings/getModels                  ------>(gets all Model)
 * return a list of the Models
 */
ModelRouter.get("/getModels/:CompanyID", controller.GetModels.bind(controller));

/**
 * GET  /api/v1/settings/getModel/:ModelID         ------>(gets a single Model)
 * return an specific Model
 */
ModelRouter.get("/getModel/:CompanyID/:ModelID", controller.GetModel.bind(controller));

// /**
//  * POST /api/v1/settings/createModel                 ------>(create a new Model)
//  * save a Model, return the ModelID
//  */
ModelRouter.post("/createModel", controller.CreateModel.bind(controller));

// /**
//  * PUT  /api/v1/settings/editModel/:ModelID        ------>(update a Model)
//  * update the Model, return the changes applied return the ModelID
//  */
ModelRouter.put("/updateModel/:CompanyID/:ModelID", controller.UpdateModel.bind(controller));



//export the router
export default ModelRouter;