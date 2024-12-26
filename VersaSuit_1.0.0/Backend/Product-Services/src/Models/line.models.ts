import { Product } from "../Models/product.models";


/**
 * this entity map the LineTypes
 */
export class LineType {
  CompanyID: number = 0;
  LineID: number = 0;
  nLine: string = "";
  Description?: string = "";
  Product?: Product[] = [];

  constructor(data: Partial<LineType>) {
    Object.assign(this, data);
  }
}
