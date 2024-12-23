import { PrismaClient } from "@prisma/client";

/**
 * class that contain all the functions to get and set the
 * model product Category. using prisma ORM in order to get the information from database
 */
export class CategoryRepository{
    private prisma = new PrismaClient();

    /**
     * get all the Categorys by a company
     */
    async FetchAll(CompanyID: Number): Promise<any>{
        return await this.prisma.category.findMany({where: {CompanyID: Number(CompanyID)}, include: { SubCategory: true}});
    }

    /**
     * get an specific CategoryID 
     * @param CategoryID 
     */
    async FetchByID(CompanyID: Number, CategoryID: Number): Promise<any>{
        return this.prisma.category.findUnique({
            where: { CategoryID_CompanyID: {CategoryID: Number(CategoryID), CompanyID: Number(CompanyID)}},
            include: { SubCategory: true}
        });
    }

    /**
     * create a new Category using prismaORM
     * return the new Category
     */
    async Save(Category: any): Promise<any>{
        try {
            //get the last index of company Category
            const LastCategory = await this.prisma.category.findFirst({where: {CompanyID: Category.CompanyID}, orderBy: {CategoryID: "desc"}})
            const CategoryID = (!LastCategory) ? 1 : LastCategory.CategoryID + 1;

            //create a new data
            const newCategory = await this.prisma.category.create({
                data: {
                CategoryID: CategoryID,
                CompanyID: Category.CompanyID,
                nCategory: Category.nCategory,
                Description: Category.Description,
            }})

            return { Message: "", data: newCategory };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific Category
     * return the updated Category
     */
    async Update(Category: any): Promise<any>{
        try {
            //create a new data
            const updatedCategory = await this.prisma.category.update({
                where: { CategoryID_CompanyID: {CategoryID: Number(Category.CategoryID), CompanyID: Number(Category.CompanyID)}},
                data: {nCategory: Category.nCategory, Description: Category.Description}
            })

            return { Message: "", data: updatedCategory };
        } catch (error) {
            return { Message: error, data: null };
        }
    }
}