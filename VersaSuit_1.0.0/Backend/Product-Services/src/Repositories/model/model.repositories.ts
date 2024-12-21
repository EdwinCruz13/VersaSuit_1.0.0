import { PrismaClient } from "@prisma/client";

/**
 * class that contain all the functions to get and set the
 * model product Model. using prisma ORM in order to get the information from database
 */
export class ModelRepository{
    private prisma = new PrismaClient();

    /**
     * get all the Models by a company
     */
    async FetchAll(CompanyID: Number): Promise<any>{
        //return this.prisma.product.findmany();
    }

    /**
     * get an specific Model 
     * @param ModelID 
     */
    async FetchByID(ModelID: Number): Promise<any>{
        //return this.prisma.product.findmany();
    }

    /**
     * create a new Model using prismaORM
     * return the new Model
     */
    async Save(Model: any): Promise<any>{
        try {
            return { Message: "", data: null };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific Model
     * return the updated Model
     */
    async Update(Model: any): Promise<any>{
        //return this.prisma.product.findmany();
    }
}