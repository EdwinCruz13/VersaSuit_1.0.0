import Router from "express";
import { CompanyController } from "../Controllers/company/company.controllers";
import { CompanyRepository } from "../Repositories/company/company.repositories";
import { CompanyService } from "../Services/company/company.services";

//create routers for all the endpoints
const companyRouter = Router();

//use dependency injection 
const Repository = new CompanyRepository();
const Service = new CompanyService(Repository);
//initializa the controller
const controller = new CompanyController(Service);


/**
 * GET  /api/v1/settings/getcompanies                  ------>(gets all company)
 * return a list of the companies
 */
companyRouter.get("/getcompanies", controller.GetCompanies.bind(controller));

/**
 * GET  /api/v1/settings/getcompany/:CompanyID         ------>(gets a single company)
 * return an specific company
 */
companyRouter.get("/getcompany/:CompanyID", controller.GetCompany.bind(controller));

// /**
//  * POST /api/v1/settings/createcompany                 ------>(create a new company)
//  * save a company, return the companyID
//  */
companyRouter.post("/createcompany", controller.CreateCompany.bind(controller));

// /**
//  * PUT  /api/v1/settings/editcompany/:CompanyID        ------>(update a company)
//  * update the company, return the changes applied return the companyID
//  */
companyRouter.put("/updatecompany/:CompanyID", controller.UpdateCompany.bind(controller));


// /**
//  * POST /api/v1/settings/addsocialmedia                 ------>(create a socialmedia contact)
//  * save a company, return the companyID
//  */
companyRouter.post("/addsocialmedia", controller.AddSocilaMedia.bind(controller));

// /**
//  * POST /api/v1/settings/addcontact                 ------>(create a new concta)
//  * save a company, return the companyID
//  */
companyRouter.post("/addcontact", controller.AddContact.bind(controller));


//export the router
export default companyRouter;