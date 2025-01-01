import { SubCategory } from "../Models/subcategory.models";
import { SubCategoryRepository } from "../Repositories/subcategory.repositories";
import { ModelMapper } from "../../../Utils/mapping.utils";

/**
 * class that contain all the functions to get and set the
 * model "Subcategory".
 */
export class SubCategoryService {
  private SubcategoryRepository: SubCategoryRepository;

  /**
   * use the inyection pattern
   * @param repository
   */
  constructor(repository: SubCategoryRepository) {
    this.SubcategoryRepository = repository;
  }

  /**
   * this method return all the Subcategories
   * @returns
   */
  async GetAll(CompanyID: number): Promise<SubCategory[] | null> {
    //get data from repository
    const dt = await this.SubcategoryRepository.FetchAll(CompanyID);

    //if there is not data return null
    if (!dt) return null;

    //return the prisma object to model[]
    return ModelMapper.toMap(SubCategory, dt) as SubCategory[];
  }
  /**
   * get the Subcategorys by ID
   * Map to CompanyModel
   * @param CompanyID
   * @returns
   */
  async GetByID(
    CompanyID: number,
    SubcategoryID: number
  ): Promise<SubCategory | null> {
    //get the data from repository
    const dt = await this.SubcategoryRepository.FetchByID(
      CompanyID,
      SubcategoryID
    );
    //if there is not data return null
    if (!dt) return null;

    //return the prisma object to model
    return ModelMapper.toMap(SubCategory, dt) as SubCategory;
  }

  /**
   * create a new Subcategorys,
   * @param companyData
   * @returns
   */
  async Create(data: any): Promise<any> {
    return await this.SubcategoryRepository.Save(data);
  }

  /**
   * a service that update the Subcategorys
   * @param companyData
   * @returns
   */
  async Update(data: any): Promise<any> {
    return await this.SubcategoryRepository.Update(data);
  }
}
