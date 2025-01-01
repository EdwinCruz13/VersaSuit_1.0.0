import { SuperCategory } from "../Models/supercategory.models";
import { SuperCategoryRepository } from "../Repositories/supercategory.repositories";
import { ModelMapper } from "../../../Utils/mapping.utils";

/**
 * class that contain all the functions to get and set the
 * model "SuperCategory".
 */
export class SuperCategoryService {
  private SuperCategoryRepository: SuperCategoryRepository;

  /**
   * use the inyection pattern
   * @param repository
   */
  constructor(repository: SuperCategoryRepository) {
    this.SuperCategoryRepository = repository;
  }

  /**
   * this method return all the Subcategories
   * @returns
   */
  async GetAll(CompanyID: number): Promise<SuperCategory[] | null> {
    //get data from repository
    const dt = await this.SuperCategoryRepository.FetchAll(CompanyID);

    //if there is not data return null
    if (!dt) return null;

    //return the prisma object to model[]
    return ModelMapper.toMap(SuperCategory, dt) as SuperCategory[];
  }
  /**
   * get the SuperCategorys by ID
   * Map to CompanyModel
   * @param CompanyID
   * @returns
   */
  async GetByID(
    CompanyID: number,
    SuperCategoryID: number
  ): Promise<SuperCategory | null> {
    //get the data from repository
    const dt = await this.SuperCategoryRepository.FetchByID(
      CompanyID,
      SuperCategoryID
    );
    //if there is not data return null
    if (!dt) return null;

    //return the prisma object to model
    return ModelMapper.toMap(SuperCategory, dt) as SuperCategory;
  }

  /**
   * create a new SuperCategorys,
   * @param companyData
   * @returns
   */
  async Create(data: any): Promise<any> {
    return await this.SuperCategoryRepository.Save(data);
  }

  /**
   * a service that update the SuperCategorys
   * @param companyData
   * @returns
   */
  async Update(data: any): Promise<any> {
    return await this.SuperCategoryRepository.Update(data);
  }
}
