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


  /**
   * allo to map the prisma object to model
   * @param data 
   * @returns 
   */
  static fromPrisma(data: any): Brand {
    return new Brand({
      CompanyID: data.CompanyID,
      BrandID: data.BrandID,
      nBrand: data.nBrand,
      Product: data.Product
    });
  }

  /**
   * this is optional
   * @returns 
   */
  toPrisma(): any {
    return {
      BrandID: this.BrandID,
      EmpresaID: this.CompanyID,
      nBrand: this.nBrand,
      Product: this.Product
    };
  }

}
