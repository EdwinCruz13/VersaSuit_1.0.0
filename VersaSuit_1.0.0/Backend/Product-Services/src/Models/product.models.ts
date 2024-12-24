import { Brand } from "./brand.models";
import { Color } from "./color.models";
import { Model } from "./model.models";
import { SubCategory } from "./subcategory.models";

/**
 * this entity map the Product
 */
export class Product {
    ProductID: number=0;
    CompanyID: number = 0;
    SubCategoryID: number = 0;
    BrandID: number = 0;
    ModelID: number = 0;
    ColorID: number = 0;
    nProduct: string = "";
    Description: string = "";
    ProductNumber: string = "";
    ModelNumber: string = "";
    Serie: string = "";
    Barcode: string = "";
    QRCode: string = "";
    Reference: string = "";
    SalePrice: number = 0.00;
    PurchasePrice: number = 0.00;
    Cost: number = 0.00;
    CurrentStock: number=0;
    MinimumStock: number=0;
    MaximumStock: number=0;
    Status: boolean = false;
    UTC_CreateAT: Date = new Date();
    GTMM6_CreateAT: Date = new Date();

    Model?: Model;
    Brand?: Brand;
    Color?: Color;
    SubCategory?: SubCategory;
  
    constructor(data: Partial<Product>) {
      Object.assign(this, data);
    }
  }