import { Request, Response } from "express";
import { BrachService } from "../../Services/company/branch.services";

/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class BranchController
{

    private BranchService = new BrachService();
    /**
     * endpoints that get all the branches from services and return the object in json format
     * @param req 
     * @param resp 
     */
    async GetBranches(req: Request, resp: Response): Promise<any>
    {
        try {
            //get data from services
            const branches = await this.BranchService.GetAll();

            //if there is not any branches send a null as response
            if (!branches)
              return resp.sendResponse(null, "There is not any branch", false, 200);

            //return the list
            return resp.sendResponse(branches, "Branches fetch succesfully ", false, 200);
        } catch (error) {
          return resp.sendResponse(null, "There is a fatal error finding the branches: " + error, true, 500);
        }
    }

    /**
     * method that return the branch by ID
     * @param req 
     * @param resp 
     * @returns 
     */
    async GetBranch(req: Request, resp: Response): Promise<any> {
        const { CompanyID, BranchID } = req.params;
        try {
          const branch = await this.BranchService.GetByID(Number(CompanyID), Number(BranchID));
    
          
          //validate the result, in any case is null, send status 409
          if (!branch) {
            return resp.sendResponse(branch, "There is not any branch", false, 200);
          }
    
          //return the list
          return resp.sendResponse(branch, "Branch fetched successfully", false, 200);


          //resp.status(200).json({Error: false, Message: "",data: branch});
        } catch (error) {
          return resp.sendResponse(null, "There is a fatal error finding the branch: " + error, true, 500);
        }
    }

    /**
     * endpoint in order to save a new branch
     * @param req 
     * @param resp 
     * @returns 
     */
    async CreateBranch(req: Request, resp: Response): Promise<any>
    {
      const { branch } = req.body;
      try {
          //send data to save
          const result = await this.BranchService.Create(branch);
          //validate the result
          if(!result || !result.data) return resp.sendResponse(null, "There is a problem saving the branch: " + result.Message, true, 409);

          else return resp.sendResponse(result.data, "The branch has been saved succesfully", false, 201);
      } catch (error) {
          return resp.sendResponse(null, "There is problem saving a branch:" + error, true, 500);
      }
    }

}