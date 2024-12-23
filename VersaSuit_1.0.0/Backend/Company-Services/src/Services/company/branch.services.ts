import { BranchRepository } from "../../Repositories/company/branch.repositories";
import { Branch } from "../../Models/company/branch.models";
import { ModelMapper } from "../../../../Utils/mapping.utils";


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
    async GetAll() : Promise<Branch[] | null>
    {
        //get data from repository
        const dt = await this.BranchService.FetchAll();

        //map the result to branch
        return ModelMapper.toMap(Branch, dt) as Branch[];
    }

    /**
     * get and map an specific branch
     * @param BranchID 
     * @returns 
     */
    async GetByID(CompanyID: number, BranchID: number) : Promise<Branch | null>
    {
        //get data from repository
        const dt = await this.BranchService.FetchByID(CompanyID, BranchID);
        
        //map the result to branch
        return ModelMapper.toMap(Branch, dt) as Branch;
    }

    /**
     * cretate a new branch for a company
     * @param Branch 
     * @returns 
     */
    async Create(Branch: Branch) : Promise<any>
    {
        return await this.BranchService.Save(Branch);
    }
}