import { CompanyRepository } from "../Repositories/company.repositories";
import { Company } from "../Models/company/company.models";

/**
 * class that contain all the functions to get and set the
 * model company. using prisma ORM in order to get the information
 * from database
 */
export class CompanyService {
  private CompanyRepository = new CompanyRepository();

  /**
   * this method return all the companies
   * @returns
   */
  async GetAllCompanies(): Promise<Company[] | null> 
  {
    //get the result from repository
    const dt = await this.CompanyRepository.FindAll();
    
    //map the result to Company
    return !dt || dt.length === 0? null: dt.map((item: any) => new Company(item));

  }
  /**
  * get the company by ID
  * Map to CompanyModel
  * @param CompanyID 
  * @returns 
  */
  async GetByID(CompanyID: number): Promise<Company | null> {

    //get the data from repository
    const dt = await this.CompanyRepository.FindByID(CompanyID);
    return dt ? new Company(dt) : null;
  }

  /**
   * create a new company,
   * @param companyData
   * @returns
   */
  async CreateCompany(companyData: any): Promise<any> {
    return await this.CompanyRepository.CreateCompany(companyData);
  }

  /**
   * a service that update the company
   * @param companyData
   * @returns
   */
  async UpdateCompany(companyData: any): Promise<any> {
    return await this.CompanyRepository.UpdateCompany(companyData);
  }
}
