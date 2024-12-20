import { PrismaClient } from "@prisma/client";

/**
 * class that contain all the functions to get and set the
 * model product category. using prisma ORM in order to get the information
 * from database
 */
export class CategoryRepository{
    private prisma = new PrismaClient();

    /**
     * get all the Categories by a company
     */
    async FetchAll(CompanyID: Number): Promise<any>{
        //return this.prisma.product.findmany();
    }

    /**
     * get an specific Category
     * @param CategoryID 
     */
    async FetchByID(CategoryID: Number): Promise<any>{
        //return this.prisma.product.findmany();
    }

    /**
     * create a new Category using prismaORM
     * return the new Category
     */
    async Save(Category: any): Promise<any>{
        try {
            return { Message: "", data: null };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific Category
     * return the updated category
     */
    async Update(Category: any): Promise<any>{
        //return this.prisma.product.findmany();
    }
}