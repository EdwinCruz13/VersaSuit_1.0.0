import { PrismaClient } from "@prisma/client";

/**
 * class that contain all the functions to get and set the
 * model product SuperCategory. using prisma ORM in order to get the information from database
 */
export class SuperCategoryRepository{
    private prisma = new PrismaClient();

    /**
     * get all the SuperCategorys by a company
     */
    async FetchAll(CompanyID: Number): Promise<any>{
        return await this.prisma.superCategory.findMany({where: {CompanyID: Number(CompanyID)}});
    }

    /**
     * get an specific SuperCategoryID 
     * @param SuperCategoryID 
     */
    async FetchByID(CompanyID: Number, SuperCategoryID: Number): Promise<any>{
        return this.prisma.superCategory.findUnique({
            where: { CompanyID_SuperCategoryID: {SuperCategoryID: Number(SuperCategoryID), CompanyID: Number(CompanyID)}},
        });
    }

    /**
     * create a new SuperCategory using prismaORM
     * return the new SuperCategory
     */
    async Save(SuperCategory: any): Promise<any>{
        try {
            //get the last index of company SuperCategory
            const LastSuperCategory = await this.prisma.superCategory.findFirst({where: {CompanyID: SuperCategory.CompanyID}, orderBy: {SuperCategoryID: "desc"}})
            const SuperCategoryID = (!LastSuperCategory) ? 1 : LastSuperCategory.SuperCategoryID + 1;

            //create a new data
            const newSuperCategory = await this.prisma.superCategory.create({
                data: {
                SuperCategoryID: SuperCategoryID,
                CompanyID: SuperCategory.CompanyID,
                nSuperCategory: SuperCategory.nSuperCategory
            }})

            return { Message: "", data: newSuperCategory };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific SuperCategory
     * return the updated SuperCategory
     */
    async Update(SuperCategory: any): Promise<any>{
        try {
            //create a new data
            const updatedSuperCategory = await this.prisma.superCategory.update({
                where: { CompanyID_SuperCategoryID: {SuperCategoryID: Number(SuperCategory.SuperCategoryID), CompanyID: Number(SuperCategory.CompanyID)}},
                data: {nSuperCategory: SuperCategory.nSuperCategory, Description: SuperCategory.Description}
            })

            return { Message: "", data: updatedSuperCategory };
        } catch (error) {
            return { Message: error, data: null };
        }
    }
}