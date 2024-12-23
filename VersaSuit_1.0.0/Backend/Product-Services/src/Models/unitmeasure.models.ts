import { Product } from "../Models/product.models";
/**
 * this entity map the UnitMeasure
 */
export class UnitMeasure {
    UnitID: number = 0;
    nUnitMeasure: string = "";
    nUnitType: string = "";
    UnitSymbol: string = "";
    Products?: Product[]

    constructor(data: Partial<UnitMeasure>) {
        Object.assign(this, data);
    }
}
