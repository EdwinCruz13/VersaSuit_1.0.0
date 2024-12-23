import { Product } from "../product/product.models";


/**
 * this entity map the brands
 */
export class Brand {
  CompanyID: number = 0;
  BrandID: number = 0;
  nBrand: string = "";
  Product?: Product[] = [];

  constructor(data: Partial<Brand>) {
    Object.assign(this, data);
  }
}
