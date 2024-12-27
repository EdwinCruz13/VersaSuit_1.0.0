import { Category } from "./category.models";

/**
 * this entity map the Category
 */
export class SuperCategory {
  SuperCategoryID: number = 0;
  CompanyID: number = 0;
  nSuperCategory: string = "";
  Description: string = "";
  Category?: Category[] = [];

  constructor(data: Partial<SuperCategory>) {
    Object.assign(this, data);
  }
}
