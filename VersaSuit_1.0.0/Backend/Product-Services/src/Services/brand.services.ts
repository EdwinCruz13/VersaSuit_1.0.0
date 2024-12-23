import { Brand } from "../Models/brand.models";
import { BrandRepository } from "../Repositories/brand.repositories";
import { ModelMapper } from "../../../Utils/mapping.utils"


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
    //get data from repository
    const dt = await this.BrandRepository.FetchAll(CompanyID);

    //if there is not data return null
    if(!dt) return null;

    //return the prisma object to model[]
    return ModelMapper.toMap(Brand, dt) as Brand[];

  }
  /**
  * get the Brands by ID
  * Map to CompanyModel
  * @param CompanyID 
  * @returns 
  */
  async GetByID(CompanyID: number, BrandID: number): Promise<Brand | null> {

    //get the data from repository
    const dt = await this.BrandRepository.FetchByID(CompanyID, BrandID);
    //if there is not data return null
    if(!dt) return null;

    //return the prisma object to model
    return ModelMapper.toMap(Brand, dt) as Brand;
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
