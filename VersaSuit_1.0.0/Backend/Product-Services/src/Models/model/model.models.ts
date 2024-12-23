import { Product } from "../product/product.models";


/**
 * this entity map the brands
 */
export class Model {
  CompanyID: number = 0;
  ModelID: number = 0;
  nModel: string = "";
  Product?: Product[] = [];

  constructor(data: Partial<Model>) {
    Object.assign(this, data);
  }
}
