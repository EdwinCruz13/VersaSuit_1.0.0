import { PrismaClient } from "@prisma/client";

/**
 * class that contain all the functions to get and set the
 * model product brand. using prisma ORM in order to get the information from database
 */
export class BrandRepository{
    private prisma = new PrismaClient();

    /**
     * get all the brands by a company
     */
    async FetchAll(CompanyID: Number): Promise<any>{
        //return this.prisma.product.findmany();
    }

    /**
     * get an specific BrandID 
     * @param BrandID 
     */
    async FetchByID(BrandID: Number): Promise<any>{
        //return this.prisma.product.findmany();
    }

    /**
     * create a new Brand using prismaORM
     * return the new brand
     */
    async Save(Brand: any): Promise<any>{
        try {
            return { Message: "", data: null };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific brand
     * return the updated brand
     */
    async Update(Brand: any): Promise<any>{
        //return this.prisma.product.findmany();
    }
}