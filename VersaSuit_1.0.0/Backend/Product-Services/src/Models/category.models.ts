import { SuperCategory } from "./supercategory.models";
import { SubCategory } from "./subcategory.models";

/**
 * this entity map the Category
 */
export class Category {
  CategoryID: number = 0;
  CompanyID: number = 0;
  SuperCategoryID: number = 0;
  nCategory: string = "";
  Description: string = "";
  SuperCategory?: SuperCategory;
  SubCategory?: SubCategory[] = [];

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
