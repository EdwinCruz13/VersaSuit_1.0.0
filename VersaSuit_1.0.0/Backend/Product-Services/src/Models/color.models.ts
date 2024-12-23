import { Product } from "../Models/product.models";

/**
 * this entity map the Colors
 */
export class Color {
    ColorID: number = 0;
    nColor: string = "";
    Hexadecimal: string = "";
    Red: number = 0;
    Green: number = 0;
    Blue: number = 0;
    Products?: Product[]

    constructor(data: Partial<Color>) {
        Object.assign(this, data);
    }
}
