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
        return await this.prisma.brand.findMany({where: {CompanyID: Number(CompanyID)}});
    }

    /**
     * get an specific BrandID 
     * @param BrandID 
     */
    async FetchByID(CompanyID: Number, BrandID: Number): Promise<any>{
        return this.prisma.brand.findUnique({
            where: { CompanyID_BrandID: {BrandID: Number(BrandID), CompanyID: Number(CompanyID)}},
        });
    }

    /**
     * create a new Brand using prismaORM
     * return the new brand
     */
    async Save(Brand: any): Promise<any>{
        try {
            //get the last index of company brand
            const LastBrand = await this.prisma.brand.findFirst({where: {CompanyID: Brand.CompanyID}, orderBy: {BrandID: "desc"}})
            const BrandID = (!LastBrand) ? 1 : LastBrand.BrandID + 1;

            //create a new data
            const newBrand = await this.prisma.brand.create({
                data: {
                BrandID: BrandID,
                CompanyID: Brand.CompanyID,
                nBrand: Brand.nBrand
            }})

            return { Message: "", data: newBrand };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific brand
     * return the updated brand
     */
    async Update(Brand: any): Promise<any>{
        try {
            //create a new data
            const updatedBrand = await this.prisma.brand.update({
                where: { CompanyID_BrandID: {BrandID: Number(Brand.BrandID), CompanyID: Number(Brand.CompanyID)}},
                data: {nBrand: Brand.nBrand}
            })

            return { Message: "", data: updatedBrand };
        } catch (error) {
            return { Message: error, data: null };
        }
    }
}