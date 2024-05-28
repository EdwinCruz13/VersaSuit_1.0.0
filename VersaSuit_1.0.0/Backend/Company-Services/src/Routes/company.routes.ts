import Router from "express";
import { GetCompanies } from "../Controllers/company.controllers";

//create routers
const companyRouter = Router();

//create the enpoints request
// GET  /api/v1/users/getcompanies                  ------>(gets all users)
// GET  /api/v1/users/getcompany/:CompanyID         ------>(gets a single user)
// POST /api/v1/users/createcompany                 ------>(create a new user)
// PUT  /api/v1/users/editcompany/:CompanyID        ------>(update a user)
// DELETE /api/v1/users/deletecompany/:CompanyID    ------>(delete a user)
companyRouter.get("/getcompanies", GetCompanies);

//export the router
export default companyRouter;