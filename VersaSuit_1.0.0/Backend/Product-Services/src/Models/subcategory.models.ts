import { Category } from "@prisma/client";
import { Product } from "../Models/product.models";


/**
 * this entity map the SubCategory
 */
export class SubCategory {
  SubCategoryID: number = 0;
  CompanyID: number = 0;
  CategoryID: number = 0;
  nSubCategory: string = "";
  Description: string = "";
  Product?: Product[] = [];
  Category?: Category;

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
