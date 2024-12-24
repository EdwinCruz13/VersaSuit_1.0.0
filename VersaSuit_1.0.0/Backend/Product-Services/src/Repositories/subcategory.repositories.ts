import { PrismaClient } from "@prisma/client";

/**
 * class that contain all the functions to get and set the
 * model product SubCategory. using prisma ORM in order to get the information from database
 */
export class SubCategoryRepository{
    private prisma = new PrismaClient();

    /**
     * get all the SubCategorys by a company
     */
    async FetchAll(CompanyID: Number): Promise<any>{
        return await this.prisma.subCategory.findMany({
            where: {CompanyID: Number(CompanyID)}, 
            include: {Category: {include: {SuperCategory: true}}}
        });
    }

    /**
     * get an specific SubCategoryID 
     * @param SubCategoryID 
     */
    async FetchByID(SubCategoryID: Number): Promise<any>{
        return this.prisma.subCategory.findUnique({
            where: { SubCategoryID: Number(SubCategoryID) },
            include: {Category: {include: {SuperCategory: true}}}
        });
    }

    /**
     * create a new SubCategory using prismaORM
     * return the new SubCategory
     */
    async Save(SubCategory: any): Promise<any>{
        try {
            //get the last index of company SubCategory
            const LastSubCategory = await this.prisma.subCategory.findFirst({where: {CompanyID: SubCategory.CompanyID}, orderBy: {SubCategoryID: "desc"}})
            const SubCategoryID = (!LastSubCategory) ? 1 : LastSubCategory.SubCategoryID + 1;

            //create a new data
            const newSubCategory = await this.prisma.subCategory.create({
                data: {
                SubCategoryID: SubCategoryID,
                CategoryID: SubCategory.CategoryID,
                CompanyID: SubCategory.CompanyID,
                nSubCategory: SubCategory.nSubCategory,
                Description: SubCategory.Description
            }})

            return { Message: "", data: newSubCategory };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific SubCategory
     * return the updated SubCategory
     */
    async Update(SubCategory: any): Promise<any>{
        try {
            //create a new data
            const updatedSubCategory = await this.prisma.subCategory.update({
                where: { SubCategoryID: Number(SubCategory.SubCategoryID) },
                data: {
                    CategoryID: SubCategory.CategoryID,
                    CompanyID: SubCategory.CompanyID,
                    nSubCategory: SubCategory.nSubCategory,
                    Description: SubCategory.Description
                }
            })

            return { Message: "", data: updatedSubCategory };
        } catch (error) {
            return { Message: error, data: null };
        }
    }
}