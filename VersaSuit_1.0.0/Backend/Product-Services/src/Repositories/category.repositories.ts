import { PrismaClient } from "@prisma/client";
import { Category } from "../Models/category.models";

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
        return await this.prisma.category.findMany({
            where: {CompanyID: Number(CompanyID)}, 
            include: { SuperCategory: true}
        });
    }

    /**
     * get an specific CategoryID 
     * @param CategoryID 
     */
    async FetchByID(CompanyID: Number, CategoryID: Number): Promise<any>{
        return this.prisma.category.findUnique({
            where: { CompanyID_CategoryID: {CategoryID: Number(CategoryID), CompanyID: Number(CompanyID)}},
            include: { SuperCategory: true}
        });
    }

    /**
     * create a new Category using prismaORM
     * return the new Category
     */
    async Save(Category: Category): Promise<any>{
        try {
            //create a new data
            const newCategory = await this.prisma.category.create({
                data: {
                CategoryID: Category.CategoryID,
                CompanyID: Category.CompanyID,
                SuperCategoryID: Category.SuperCategoryID,
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
                where: { CompanyID_CategoryID: {CategoryID: Number(Category.CategoryID), CompanyID: Number(Category.CompanyID)}},
                data: {nCategory: Category.nCategory, Description: Category.Description, SuperCategoryID: Category.SuperCategoryID}
            })

            return { Message: "", data: updatedCategory };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * method that help to get the last CategoryID
     * @param CompanyID 
     * @returns 
     */
    async FetchLastID(CompanyID: number): Promise<number>{
        const LastCategory = await this.prisma.category.findFirst({where: {CompanyID: CompanyID}, orderBy: {CategoryID: "desc"}})
        const CategoryID = (!LastCategory) ? 1 : LastCategory.CategoryID + 1;

        return CategoryID;
    }
}