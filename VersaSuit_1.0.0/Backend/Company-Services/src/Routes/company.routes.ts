import Router from "express";
import { CompanyController } from "../Controllers/company.controllers";

//create routers for all the endpoints
const companyRouter = Router();

//initializa the controller
const controller = new CompanyController();


/**
 * GET  /api/v1/users/getcompanies                  ------>(gets all company)
 * return a list of the companies
 */
companyRouter.get("/getcompanies", controller.GetCompanies.bind(controller));

/**
 * GET  /api/v1/users/getcompany/:CompanyID         ------>(gets a single company)
 * return an specific company
 */
companyRouter.get("/getcompany/:CompanyID", controller.GetCompany.bind(controller));

// /**
//  * POST /api/v1/users/createcompany                 ------>(create a new company)
//  * save a company, return the companyID
//  */
companyRouter.post("/createcompany", controller.CreateCompany.bind(controller));



// /**
//  * PUT  /api/v1/users/editcompany/:CompanyID        ------>(update a company)
//  * update the company, return the changes applied
//  * update a company, return the companyID
//  */
// companyRouter.put("/updatecompany", UpdateCompany);


// DELETE /api/v1/users/deletecompany/:CompanyID    ------>(delete a company)


//export the router
export default companyRouter;