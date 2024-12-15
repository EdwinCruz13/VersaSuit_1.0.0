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
     * get all the branches from services and return the object in json format
     * @param req 
     * @param resp 
     */
    async GetBranches(req: Request, resp: Response): Promise<any>
    {
        try {
            //get data from services
            const branches = await this.BranchService.GetAll();
            if (!branches)
                return resp.status(200).json({Error: false, Message: "There is not branches saved",data: null});
            //return the list
            return resp.status(200).json(branches);
        } catch (error) {
            return resp.status(500).json({ Error: true, Message: "There is a fatal error finding the branches: " + error, data: null});
        }
    }

    async GetBranch(req: Request, resp: Response): Promise<any> {
        const { CompanyID, BranchID } = req.params;
        try {
          const branch = await this.BranchService.GetByID(Number(CompanyID), Number(BranchID));
    
          
          //validate the result, in any case is null, send status 409
          if (!branch) {
            return resp.status(200).json({Error: false,Message: "branch has not been found",data: null});
          }
    
          //return the list
          resp.status(200).json(branch);
        } catch (error) {
          return resp.status(500).json({Error: true, Message: "There is a fatal error finding the branch: " + error, data: null});
        }
      }

}