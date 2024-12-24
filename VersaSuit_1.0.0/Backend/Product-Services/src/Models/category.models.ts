import { SuperCategory } from "./supercategory.models";
import { SubCategory } from "./subcategory.models";

/**
 * this entity map the Category
 */
export class Category {
  CompanyID: number = 0;
  CategoryID: number = 0;
  nCategory: string = "";
  Description: string = "";
  SuperCategory?: SuperCategory;
  SubCategory?: SubCategory[] = [];

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
