import { Request, Response } from "express";
import { CompanyService } from "../../Services/company/company.services";
import { SocialMediaService } from "../../Services/company/socialmedia.services";
import { ContactService } from "../../Services/company/contact.services";

/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class CompanyController {
  private CompanyService = new CompanyService();
  private SocialMediaService = new SocialMediaService();
  private ContactService = new ContactService();

  /**
   * method http for get companies
   * return the list of companies in https
   * @param req
   * @param resp
   */
  async GetCompanies(req: Request, resp: Response): Promise<any> {
    try {
      const companies = await this.CompanyService.GetAll();
      if (!companies)
        return resp.sendResponse(null, "There are not companies saved", false, 200)

      //return the list
      return resp.sendResponse(companies, "The Companies have been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the companies: " + error, true, 500)
    }
  }

  /**
   * return a especific company
   * @param req
   * @param resp
   */
  async GetCompany(req: Request, resp: Response): Promise<any> {
    const { CompanyID } = req.params;
    try {
      const company = await this.CompanyService.GetByID(Number(CompanyID));

      
      //validate the result, in any case is null, send status 409
      if (!company) {
        return resp.sendResponse(null, "The company has not been found", false, 200)
      }

      //return the list
      return resp.sendResponse(company, "The company has been fetched succesfully", false, 200)
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error finding the companies: " + error, true, 500)
    }
  }

  /**
   * this method create a new company
   * the main company automatically create the main branch
   * @param req
   * @param res
   */
  async CreateCompany(req: Request, resp: Response): Promise<any> {
    const { company } = req.body;
    try {
      const result = await this.CompanyService.Create(company);
      if (result.data == 0)
        return resp.sendResponse(null, "There is a problem creating a company: " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "he company has been created", false, 201);
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error creating the company: " + error, true, 500)
    }
  }

  /**
   * this method update the an specific company
   * @param req 
   * @param resp 
   * @returns 
   */
  async UpdateCompany(req: Request, resp: Response): Promise<any> {
    const { company } = req.body;

    try {
      const result = await this.CompanyService.Update(company);
      if (result.Message.includes("already exists"))
        return resp.sendResponse(null, "There is a problem editing a company: " + result.Message, true, 409);

      else
        return resp.sendResponse(result.data, "he company has been saved", false, 201);

    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error editing the company: " + error, true, 500)
    }
  }

  /**
   * this method adds a new contact for social media
   * @param req 
   * @param resp 
   * @returns 
   */
  async AddSocilaMedia(req: Request, resp: Response): Promise<any> {
    const { socialmedia } = req.body;
    try {
      const result = await this.SocialMediaService.Create(socialmedia);
      
      if (!result || !result.data)
        return resp.sendResponse(null, "There is a problem adding a social media contact: " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "the social media contact has been added", false, 201);
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error adding a social media contact: " + error, true, 500)
    }
  }


  /**
   * this method add a new contact
   * @param req 
   * @param resp 
   * @returns 
   */
  async AddContact(req: Request, resp: Response): Promise<any> {
    const { contact } = req.body;
    try {
      const result = await this.ContactService.Create(contact);
      
      if (!result || !result.data)
        return resp.sendResponse(null, "There is a problem adding a contact : " + result.Message, true, 409);
      else
        return resp.sendResponse(result.data, "the contact has been added", false, 201);
    } catch (error) {
      return resp.sendResponse(null, "There is a fatal error adding a contact: " + error, true, 500)
    }
  }



}