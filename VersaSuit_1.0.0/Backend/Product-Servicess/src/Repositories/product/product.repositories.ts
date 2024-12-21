import { PrismaClient } from "@prisma/client";

/**
 * class that contain all the functions to get and set the
 * model product. using prisma ORM in order to get the information
 * from database
 */
export class ProductRepository{
    private prisma = new PrismaClient();

    /**
     * get all the product by a company
     */
    async FetchAll(CompanyID: Number): Promise<any>{
        //return this.prisma.product.findmany();
    }

    /**
     * get an specific product
     * using ProductID to get one
     * @param ProductoID 
     */
    async FetchByID(ProductoID: Number): Promise<any>{
        //return this.prisma.product.findmany();
    }

    /**
     * create a new product using prismaORM
     * return the new product
     */
    async Save(Product: any): Promise<any>{
        try {
            return { Message: "", data: null };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific product
     */
    async Update(Product: any): Promise<any>{
        //return this.prisma.product.findmany();
    }
}