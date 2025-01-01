import { Category } from "../Models/category.models";
import { CategoryRepository } from "../Repositories/category.repositories";
import { ModelMapper } from "../../../Utils/mapping.utils";

/**
 * class that contain all the functions to get and set the
 * model "Category".
 */
export class CategoryService {
  private CategoryRepository: CategoryRepository;

  /**
   * use the inyection pattern
   * @param repository
   */
  constructor(repository: CategoryRepository) {
    this.CategoryRepository = repository;
  }

  /**
   * this method return all the Categorys
   * @returns
   */
  async GetAll(CompanyID: number): Promise<Category[] | null> {
    //get data from repository
    const dt = await this.CategoryRepository.FetchAll(CompanyID);

    //if there is not data return null
    if (!dt) return null;

    //return the prisma object to model[]
    return ModelMapper.toMap(Category, dt) as Category[];
  }
  /**
   * get the Categorys by ID
   * Map to CompanyModel
   * @param CompanyID
   * @returns
   */
  async GetByID(
    CompanyID: number,
    CategoryID: number
  ): Promise<Category | null> {
    //get the data from repository
    const dt = await this.CategoryRepository.FetchByID(CompanyID, CategoryID);
    //if there is not data return null
    if (!dt) return null;

    //return the prisma object to model
    return ModelMapper.toMap(Category, dt) as Category;
  }

  /**
   * create a new Categorys,
   * @param companyData
   * @returns
   */
  async Create(data: Category): Promise<any> {
    try {
      //get the last ID
      const FetchLastID = await this.CategoryRepository.FetchLastID(data.CompanyID);

      //logic business
      data.CategoryID = FetchLastID;

      return await this.CategoryRepository.Save(data);
    } catch (error) {}
  }

  /**
   * a service that update the Categorys
   * @param companyData
   * @returns
   */
  async Update(data: any): Promise<any> {
    return await this.CategoryRepository.Update(data);
  }
}
