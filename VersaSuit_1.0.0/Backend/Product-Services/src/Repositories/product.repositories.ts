import { PrismaClient } from "@prisma/client";
import { SuperCategory } from "Models/supercategory.models";

/**
 * class that contain all the functions to get and set the
 * model product Product. using prisma ORM in order to get the information from database
 */
export class ProductRepository {
  private prisma = new PrismaClient();

  /**
   * get all the Products by a company
   */
  async FetchAll(CompanyID: Number): Promise<any> {
    return await this.prisma.product.findMany({
      where: { CompanyID: Number(CompanyID) },
      include: {
        Model: true,
        Brand: true,
        Color: true,
        SubCategory: {
          include: { Category: { include: { SuperCategory: true } } }
        }
      }
    });
  }

  /**
   * get an specific ProductID
   * @param ProductID
   */
  async FetchByID(CompanyID: Number, ProductID: Number): Promise<any> {
    return this.prisma.product.findUnique({
      where: {
        ProductID_CompanyID: {
          ProductID: Number(ProductID),
          CompanyID: Number(CompanyID)
        }
      },
      include: {
        Model: true,
        Brand: true,
        Color: true,
        SubCategory: {
          include: { Category: { include: { SuperCategory: true } } }
        }
      }
    });
  }

  // /**
  //  * create a new Product using prismaORM
  //  * return the new Product
  //  */
  // async Save(Product: any): Promise<any>{
  //     try {
  //         //get the last index of company Product
  //         const LastProduct = await this.prisma.product.findFirst({where: {CompanyID: Product.CompanyID}, orderBy: {ProductID: "desc"}})
  //         const ProductID = (!LastProduct) ? 1 : LastProduct.ProductID + 1;

  //         //create a new data
  //         const newProduct = await this.prisma.product.create({
  //             data: {
  //             ProductID: ProductID,
  //             CompanyID: Product.CompanyID,
  //             SuperProductID: Product.SuperProductID,
  //             nProduct: Product.nProduct,
  //             Description: Product.Description,
  //         }})

  //         return { Message: "", data: newProduct };
  //     } catch (error) {
  //         return { Message: error, data: null };
  //     }
  // }

  // /**
  //  * update a a especific Product
  //  * return the updated Product
  //  */
  // async Update(Product: any): Promise<any>{
  //     try {
  //         //create a new data
  //         const updatedProduct = await this.prisma.product.update({
  //             where: { ProductID_CompanyID: {ProductID: Number(Product.ProductID), CompanyID: Number(Product.CompanyID)}},
  //             data: {nProduct: Product.nProduct, Description: Product.Description, SuperProductID: Product.SuperProductID}
  //         })

  //         return { Message: "", data: updatedProduct };
  //     } catch (error) {
  //         return { Message: error, data: null };
  //     }
  // }
}