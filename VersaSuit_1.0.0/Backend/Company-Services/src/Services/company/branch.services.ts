import { BranchRepository } from "../../Repositories/company/branch.repositories";
import { CompanyBranch } from "../../Models/company/branch.models";


/**
 * class that contain all the functions to get and set the
 * model branch
 */
export class BrachService
{
    /**
     * this method communicate the repository
     */
    private BranchService = new BranchRepository();

    /**
     * this method gets and maps this branches
     * @returns 
     */
    async GetAll() : Promise<CompanyBranch | null>
    {
        const dt = await this.BranchService.GetBranches();

        //map and return the result
        return (!dt || dt.length === 0) ? null: dt.map((item: any ) => new CompanyBranch(item))
    }

    /**
     * get and map an specific branch
     * @param BranchID 
     * @returns 
     */
    async GetByID(CompanyID: number, BranchID: number) : Promise<CompanyBranch | null>
    {
        const dt = await this.BranchService.GetBranchByID(CompanyID, BranchID);

        //map and return the result
        return (!dt) ? null: new CompanyBranch(dt);
    }
}