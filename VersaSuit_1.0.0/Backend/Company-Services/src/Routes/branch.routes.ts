import Router from "express";
import { BranchController } from "../Controllers/company/branch.controllers";
import { BranchRepository } from "../Repositories/company/branch.repositories";
import { BrachService } from "../Services/company/branch.services";

//create routers for all the endpoints
const branchesRouter = Router();

//use dependency injection for the layers
const Repository = new BranchRepository();
const Services = new BrachService(Repository);
//initializa the controller
const controller = new BranchController(Services);

/**
 * GET  /api/v1/users/getcompanies                  ------>(gets all company)
 * return a list of the companies
 */
branchesRouter.get("/getbranches", controller.GetBranches.bind(controller));

/**
 * GET  /api/v1/users/getcompany/:CompanyID         ------>(gets a single company)
 * return an specific company
 */
branchesRouter.get("/getbranch/:CompanyID/:BranchID", controller.GetBranch.bind(controller));

// /**
//  * POST /api/v1/users/createcompany                 ------>(create a new company)
//  * save a company, return the companyID
//  */
branchesRouter.post("/createbranch", controller.CreateBranch.bind(controller));



// // /**
// //  * PUT  /api/v1/users/editcompany/:CompanyID        ------>(update a company)
// //  * update the company, return the changes applied return the companyID
// //  */
// companyRouter.put("/updatecompany/:CompanyID", controller.UpdateCompany.bind(controller));

//export the router
export default branchesRouter;
