import { PrismaClient } from "@prisma/client";

export class BranchRepository 
{
    /**
     * private method that instance the PrismaORM
     */
    private prisma = new PrismaClient();

    /**
     * method that get all the branches
     */
    async GetBranches() : Promise<any>
    {
        return await this.prisma.companyBranch.findMany({ include: { City: { include: {Country: true}}}});
    }

    /**
     * get the info of an specific branch
     * return branch and its company that belongs
     * @param BranchID 
     * @returns 
     */
    async GetBranchByID(CompanyID: number, BranchID: number) : Promise<any>
    {
        //look up for the branches, include company and its city
         const result = await this.prisma.companyBranch.findFirst({
            where: { BranchID: Number(BranchID), CompanyID: Number(CompanyID) },
            include: { Company: true,  City: { include: {Country: true}}}
        });

        //return the selected branch
        return result;
    }
}