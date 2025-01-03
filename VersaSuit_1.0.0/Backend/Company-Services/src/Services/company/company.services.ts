import { CompanyRepository } from "../../Repositories/company/company.repositories";
import { Company } from "../../Models/company/company.models";
import { ModelMapper } from "../../../../Utils/mapping.utils";

/**
 * class that contain all the functions to get and set the
 * model company. using prisma ORM in order to get the information
 * from database
 */
export class CompanyService {
  private CompanyRepository: CompanyRepository;

  constructor(repository: CompanyRepository){
    this.CompanyRepository = repository;
  }

  /**
   * this method return all the companies
   * @returns
   */
  async GetAll(): Promise<Company[] | null> 
  {
    //get the result from repository
    const dt = await this.CompanyRepository.FetchAll();
    
    //map the result to Company
    return ModelMapper.toMap(Company, dt) as Company[];

  }
  /**
  * get the company by ID
  * Map to CompanyModel
  * @param CompanyID 
  * @returns 
  */
  async GetByID(CompanyID: number): Promise<Company | null> {

    //get the data from repository
    const dt = await this.CompanyRepository.FetchByID(CompanyID);
    
    //map the result to Company
    return ModelMapper.toMap(Company, dt) as Company;
  }

  /**
   * create a new company,
   * @param companyData
   * @returns
   */
  async Create(companyData: any): Promise<any> {
    return await this.CompanyRepository.Save(companyData);
  }

  /**
   * a service that update the company
   * @param companyData
   * @returns
   */
  async Update(companyData: any): Promise<any> {
    return await this.CompanyRepository.Update(companyData);
  }


}
