import { PrismaClient } from "@prisma/client";
import { Branch } from "Models/company/branch.models";

export class BranchRepository {
  /**
   * private method that instance the PrismaORM
   */
  private prisma = new PrismaClient();

  /**
   * method that get all the branches
   */
  async FetchAll(): Promise<any> {
    return await this.prisma.companyBranch.findMany({
      include: { City: { include: { Country: true } } }
    });
  }

  /**
   * get the info of an specific branch
   * return branch and its company that belongs
   * @param BranchID
   * @returns
   */
  async FetchByID(CompanyID: number, BranchID: number): Promise<any> {
    //look up for the branches, include company and its city
    const result = await this.prisma.companyBranch.findFirst({
      where: { BranchID: Number(BranchID), CompanyID: Number(CompanyID) },
      include: { Company: true, City: { include: { Country: true } } }
    });

    //return the selected branch
    return result;
  }

  /**
   * create a new branch for a company
   * @param branch
   */
  async Save(branch: Branch): Promise<any> {
    try {
      //get tha maxID for the branch in an specific company
      const LastBranch = await this.prisma.companyBranch.findFirst({
        where: { CompanyID: branch.CompanyID },
        orderBy: { BranchID: "desc" }
      });
      const BranchID = !LastBranch ? 1 : LastBranch.BranchID + 1;

      //save the branch for an specific company
      const newBranch = await this.prisma.companyBranch.create({
        data: {
          CompanyID: branch.CompanyID,
          BranchID: BranchID,
          CityID: branch.CityID,
          CountryID: branch.CountryID,
          ManagerID: branch.ManagerID,
          Address: branch.Address,
          PhoneNumber: branch.PhoneNumber,
          ExtNumber: branch.ExtNumber,
          PostalCode: branch.PostalCode,
          HasWarehouse: branch.HasWarehouse,
          IsMainBranch: false,
          Latitude: branch.Latitude,
          Longitude: branch.Longitude
        }
      });

      return { Message: "", data: newBranch } ;
    } catch (error) {
      return { Message: error, data: null };
    }
  }
}
