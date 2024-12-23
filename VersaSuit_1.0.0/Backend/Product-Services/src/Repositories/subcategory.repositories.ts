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
        return await this.prisma.subCategory.findMany({where: {CompanyID: Number(CompanyID)}, include: {Category: true}});
    }

    /**
     * get an specific SubCategoryID 
     * @param SubCategoryID 
     */
    //async FetchByID(CompanyID: Number, SubCategoryID: Number): Promise<any>{
    //     return this.prisma.subCategory.findUnique({
    //         where: { SubCategoryID: {SubCategoryID: Number(SubCategoryID), CompanyID: Number(CompanyID)}},
    //     });
    // }

    // /**
    //  * create a new SubCategory using prismaORM
    //  * return the new SubCategory
    //  */
    // async Save(SubCategory: any): Promise<any>{
    //     try {
    //         //get the last index of company SubCategory
    //         const LastSubCategory = await this.prisma.subCategory.findFirst({where: {CompanyID: SubCategory.CompanyID}, orderBy: {SubCategoryID: "desc"}})
    //         const SubCategoryID = (!LastSubCategory) ? 1 : LastSubCategory.SubCategoryID + 1;

    //         //create a new data
    //         const newSubCategory = await this.prisma.subCategory.create({
    //             data: {
    //             SubCategoryID: SubCategoryID,
    //             CompanyID: SubCategory.CompanyID,
    //             nSubCategory: SubCategory.nSubCategory
    //         }})

    //         return { Message: "", data: newSubCategory };
    //     } catch (error) {
    //         return { Message: error, data: null };
    //     }
    // }

    // /**
    //  * update a a especific SubCategory
    //  * return the updated SubCategory
    //  */
    // async Update(SubCategory: any): Promise<any>{
    //     try {
    //         //create a new data
    //         const updatedSubCategory = await this.prisma.subCategory.update({
    //             where: { SubCategoryID: {SubCategoryID: Number(SubCategory.SubCategoryID), CompanyID: Number(SubCategory.CompanyID)}},
    //             data: {nSubCategory: SubCategory.nSubCategory}
    //         })

    //         return { Message: "", data: updatedSubCategory };
    //     } catch (error) {
    //         return { Message: error, data: null };
    //     }
    // }
}