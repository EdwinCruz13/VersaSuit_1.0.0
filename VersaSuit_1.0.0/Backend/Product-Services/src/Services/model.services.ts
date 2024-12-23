import { Model } from "../Models/model.models";
import { ModelRepository } from "../Repositories/model.repositories";
import { ModelMapper } from "../../../Utils/mapping.utils"


/**
 * class that contain all the functions to get and set the
 * model "Model". 
 */
export class ModelService 
{
  private ModelRepository = new ModelRepository();

  /**
   * this method return all the Models
   * @returns
   */
  async GetAll(CompanyID: number): Promise<Model[] | null> 
  {
    //get data from repository
    const dt = await this.ModelRepository.FetchAll(CompanyID);

    //if there is not data return null
    if(!dt) return null;

    //return the prisma object to model[]
    return ModelMapper.toMap(Model, dt) as Model[];

  }
  /**
  * get the Models by ID
  * Map to CompanyModel
  * @param CompanyID 
  * @returns 
  */
  async GetByID(CompanyID: number, ModelID: number): Promise<Model | null> {

    //get the data from repository
    const dt = await this.ModelRepository.FetchByID(CompanyID, ModelID);
    //if there is not data return null
    if(!dt) return null;

    //return the prisma object to model
    return ModelMapper.toMap(Model, dt) as Model;
  }

  /**
   * create a new Models,
   * @param companyData
   * @returns
   */
  async Create(data: any): Promise<any> {
    return await this.ModelRepository.Save(data);
  }

  /**
   * a service that update the Models
   * @param companyData
   * @returns
   */
  async Update(data: any): Promise<any> {
    return await this.ModelRepository.Update(data);
  }


}
