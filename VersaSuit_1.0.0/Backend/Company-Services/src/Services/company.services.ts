import { CompanyRepository } from "../Repositories/company.repositories";
import { Company } from "../Models/company/company.models";

/**
 * class that contain all the functions to get and set the 
 * model company. using prisma ORM in order to get the information 
 * from database
 */
export class CompanyService
{

    private CompanyRepository = new CompanyRepository();

    /**
     * this method return all the companies
     * @returns 
     */
    async GetAllCompanies () : Promise<Company[] | null> 
    {
        //get the data from repository
        return this.CompanyRepository.FindAll();
    }

    async GetByID (CompanyID: number) : Promise<Company | null>
    {
        //get the data from repository
        return this.CompanyRepository.FindByID(CompanyID);
    }

    /**
     * create a new company, 
     * @param companyData 
     * @returns 
     */
    async CreateCompany(companyData: any): Promise<any> {
      return await this.CompanyRepository.Create(companyData);
    }
  
}