import { Brand } from "../../Models/brand/brand.models";
import { BrandRepository } from "../../Repositories/brand/brand.repositories";


/**
 * class that contain all the functions to get and set the
 * model "brand". 
 */
export class BrandService 
{
  private BrandRepository = new BrandRepository();

  /**
   * this method return all the Brands
   * @returns
   */
  async GetAll(CompanyID: number): Promise<Brand[] | null> 
  {

    const dt = await this.BrandRepository.FetchAll(CompanyID);
    const dtBrand = dt.map(Brand.fromPrisma) 
    
    return dtBrand;


    //get the result from repository
    // const dt = await this.BrandRepository.FetchAll(CompanyID);
    
    // //map the result to Company
    // return !dt || dt.length === 0? null: dt.map((item: any) => new Brand(item));

  }
  /**
  * get the Brands by ID
  * Map to CompanyModel
  * @param CompanyID 
  * @returns 
  */
  async GetByID(CompanyID: number): Promise<Brand | null> {

    //get the data from repository
    const dt = await this.BrandRepository.FetchByID(CompanyID);
    return dt ? new Brand(dt) : null;
  }

  /**
   * create a new Brands,
   * @param companyData
   * @returns
   */
  async Create(data: any): Promise<any> {
    return await this.BrandRepository.Save(data);
  }

  /**
   * a service that update the Brands
   * @param companyData
   * @returns
   */
  async Update(data: any): Promise<any> {
    return await this.BrandRepository.Update(data);
  }


}
