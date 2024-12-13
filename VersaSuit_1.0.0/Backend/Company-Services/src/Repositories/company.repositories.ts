import { PrismaClient } from "@prisma/client";
import { Company } from "../Models/company/company.models";

/**
 * class that contain all the functions to get and set the
 * model company. using prisma ORM in order to get the information
 * from database
 */
export class CompanyRepository {
  //use prismaClient as ORM
  private prisma = new PrismaClient();

  /**
   * function that return the list of companies
   * @returns
   */
  async FindAll(): Promise<Company[] | null> {
    //look up for companies
    const companies = await this.prisma.company.findMany();

    //return the list of company => map all the result
    //if the array is empty then return null
    return (!companies || companies.length === 0) ? null:  companies.map((item) => new Company(item));
  }

  /**
   * return a company by Id as an param
   * @param CompanyID 
   * @returns 
   */
  async FindByID(CompanyID: number): Promise<Company | null> {
    //look up for companies
    const company = await this.prisma.company.findUnique({
      where: { CompanyID: Number(CompanyID) }
    });

    //return the company
    return company ? new Company(company) : null;
  }
}
