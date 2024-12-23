import { SubCategory } from "@prisma/client";
import { Product } from "../Models/product.models";


/**
 * this entity map the Category
 */
export class Category {
  CompanyID: number = 0;
  CategoryID: number = 0;
  nCategory: string = "";
  Description: string = "";
  SubCategory?: SubCategory[] = [];

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
