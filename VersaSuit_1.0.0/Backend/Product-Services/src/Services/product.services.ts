import { Product } from "../Models/product.models";
import { ProductRepository } from "../Repositories/product.repositories";
import { ModelMapper } from "../../../Utils/mapping.utils";

/**
 * class that contain all the functions to get and set the
 * model "Product".
 */
export class ProductService {
  private ProductRepository = new ProductRepository();

  /**
   * this method return all the Products
   * @returns
   */
  async GetAll(CompanyID: number): Promise<Product[] | null> {
    //get data from repository
    const dt = await this.ProductRepository.FetchAll(CompanyID);

    //if there is not data return null
    if (!dt) return null;

    //return the prisma object to model[]
    return ModelMapper.toMap(Product, dt) as Product[];
  }

  /**
   * get the Products by ID
   * Map to CompanyModel
   * @param CompanyID
   * @returns
   */
  async GetByID(CompanyID: number, ProductID: number): Promise<Product | null> {
    //get the data from repository
    const dt = await this.ProductRepository.FetchByID(CompanyID, ProductID);
    //if there is not data return null
    if (!dt) return null;

    //return the prisma object to model
    return ModelMapper.toMap(Product, dt) as Product;
  }

  //   /**
  //    * create a new Products,
  //    * @param companyData
  //    * @returns
  //    */
  //   async Create(data: any): Promise<any> {
  //     return await this.ProductRepository.Save(data);
  //   }

  //   /**
  //    * a service that update the Products
  //    * @param companyData
  //    * @returns
  //    */
  //   async Update(data: any): Promise<any> {
  //     return await this.ProductRepository.Update(data);
  //   }
}
