import { Product } from "../Models/product.models";
import { Category } from "../Models/category.models";


/**
 * this entity map the SubCategory
 */
export class SubCategory {
  SubCategoryID: number = 0;
  CompanyID: number = 0;
  CategoryID: number = 0;
  nSubCategory: string = "";
  Description: string = "";
  Category?: Category;
  Product?: Product[] = [];

  constructor(data: Partial<SubCategory>) {
    Object.assign(this, data);
  }
}
