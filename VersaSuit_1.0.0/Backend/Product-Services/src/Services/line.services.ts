import { LineType } from "../Models/line.models";
import { LineTypeRepository } from "../Repositories/line.repositories";
import { ModelMapper } from "../../../Utils/mapping.utils"


/**
 * class that contain all the functions to get and set the
 * model "LineType". 
 */
export class LineTypeService 
{
  private LineTypeRepository = new LineTypeRepository();

  /**
   * this method return all the LineTypes
   * @returns
   */
  async GetAll(CompanyID: number): Promise<LineType[] | null> 
  {
    //get data from repository
    const dt = await this.LineTypeRepository.FetchAll(CompanyID);

    //if there is not data return null
    if(!dt) return null;

    //return the prisma object to model[]
    return ModelMapper.toMap(LineType, dt) as LineType[];

  }
  /**
  * get the LineTypes by ID
  * Map to CompanyModel
  * @param CompanyID 
  * @returns 
  */
  async GetByID(CompanyID: number, LineID: number): Promise<LineType | null> {

    //get the data from repository
    const dt = await this.LineTypeRepository.FetchByID(CompanyID, LineID);
    //if there is not data return null
    if(!dt) return null;

    //return the prisma object to model
    return ModelMapper.toMap(LineType, dt) as LineType;
  }

  /**
   * create a new LineTypes,
   * @param companyData
   * @returns
   */
  async Create(data: any): Promise<any> {
    return await this.LineTypeRepository.Save(data);
  }

  /**
   * a service that update the LineTypes
   * @param companyData
   * @returns
   */
  async Update(data: any): Promise<any> {
    return await this.LineTypeRepository.Update(data);
  }


}
