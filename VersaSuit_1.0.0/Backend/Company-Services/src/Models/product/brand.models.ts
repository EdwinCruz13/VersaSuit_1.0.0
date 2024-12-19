
/**
 * this entity map the brands
 */
export class Brand {
  CompanyID: number = 0;

  constructor(data: any) {
    this.CompanyID = data.CompanyID;
  }
}
