import { PrismaClient } from "@prisma/client";

/**
 * class that contain all the functions to get and set the
 * model product SubCategory. using prisma ORM in order to get the information
 * from database
 */
export class SubCategoryRepository{
    private prisma = new PrismaClient();

    /**
     * get all the SubCategories by a company
     */
    async FetchAll(CompanyID: Number): Promise<any>{
        //return this.prisma.product.findmany();
    }

    /**
     * get an specific SubCategory
     * @param SubCategoryID 
     */
    async FetchByID(SubCategoryID: Number): Promise<any>{
        //return this.prisma.product.findmany();
    }

    /**
     * create a new SubCategory using prismaORM
     * return the new SubCategory
     */
    async Save(SubCategory: any): Promise<any>{
        try {
            return { Message: "", data: null };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific SubCategory
     * return the updated SubCategory
     */
    async Update(SubCategory: any): Promise<any>{
        //return this.prisma.product.findmany();
    }
}