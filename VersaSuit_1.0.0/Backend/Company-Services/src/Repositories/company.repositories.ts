import { PrismaClient } from '@prisma/client';
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

  /**
   * create a company and its main branch
   * use a stored procedure in order to save the register
   */
  async Create(company: Company): Promise<any>{

    //execute a stored procedure in order to create a company and its main branch
    //the stored procedure validate the creating
    //it includes a transaction
    const result: any = await this.prisma.$queryRaw<
      {Message: String, CompanyID: number, } //define the output
    >
    `
    --this order must be fit according the stored procedure
    DECLARE @CompanyID INT, @Message NVARCHAR(50);
    EXEC CompanyCreate  @Message OUTPUT, @CompanyID OUTPUT, ${company.nCompany}, ${company.Abbre}, ${company.FiscalNumber}, 
                        ${company.CompanyBranch[0].Address}, ${company.CompanyBranch[0].PhoneNumber},
                        ${company.CompanyBranch[0].PostalCode}, ${company.Email}, ${company.Website},
                        ${company.PrimaryHeader}, ${company.SecondaryHeader}, ${company.PrimaryFooter}, ${company.SecondaryFooter},
                        ${company.HasBranch}, ${company.CompanyBranch[0].HasWarehouse}, ${company.CompanyBranch[0].CityID}, ${company.CompanyBranch[0].CountryID}, 
                        ${company.CompanyBranch[0].ManagerID}, ${company.RLogo}, ${company.LLogo},
                        ${company.CompanyBranch[0].Latitude}, ${company.CompanyBranch[0].Longitude};
      SELECT @CompanyID AS CompanyID, @Message AS Message;
    `;


    // Extraer los valores de salida
    const { CompanyID, Message } = result[0];
    
    if(CompanyID == 0)
      return {Message: Message, data: 0}
      
    //return the last company created
    else{
      const data = await this.prisma.company.findFirst({where: { CompanyID: CompanyID}})
      return {Message: Message, data: data}
    }
      
  }

  /**
   * this method create a new company
   * the main branch must be created automatically
   */
  // async Create(companyData: Company): Promise<any>
  // {
  //   //find the last company saved in the 
  //   let lastCompany = await this.prisma.company.findFirst({orderBy:{CompanyID: 'desc'}});

  //   /////////////////////////////////////////////////////////
  //   //insert a new company
  //   ////////////////////////////////////////////////////////
  //   const newCompany = await this.prisma.company.create({
  //     data: {
  //       CompanyID: (!lastCompany) ? 1 : lastCompany.CompanyID + 1,
  //       nCompany: companyData.nCompany,
  //       Abbre: companyData.Abbre,
  //       FiscalNumber: companyData.FiscalNumber,
  //       RLogo: companyData.RLogo,
  //       LLogo: companyData.LLogo,
  //       PrimaryHeader: companyData.PrimaryHeader,
  //       SecondaryHeader: companyData.SecondaryHeader,
  //       PrimaryFooter: companyData.PrimaryFooter,
  //       SecondaryFooter: companyData.SecondaryFooter,
  //       HasBranch:companyData.HasBranch,
  //       Website: companyData.Website,
  //       Email: companyData.Email,
  //       PhoneNumber: companyData.PhoneNumber
  //     }
  //   })

  //   //after create a new company, it must create the main branch
  //   let lastBranch = await this.prisma.companyBranch.findFirst({where: { Company: {CompanyID: newCompany.CompanyID } },   orderBy:{BranchID: 'desc'}});
    
  //   const newBranch = await this.prisma.companyBranch.create({
  //     data: {
  //       BranchID: (!lastBranch) ? 1 : lastBranch.BranchID + 1,
  //       CompanyID: newCompany.CompanyID,
  //       CityID: companyData.CompanyBranch[0].CityID,
  //       CountryID: companyData.CompanyBranch[0].CountryID,
  //       ManagerID: companyData.CompanyBranch[0].ManagerID,
  //       Address: companyData.CompanyBranch[0].Address,
  //       PhoneNumber: companyData.CompanyBranch[0].PhoneNumber,
  //       ExtNumber: companyData.CompanyBranch[0].ExtNumber,
  //       PostalCode: companyData.CompanyBranch[0].PostalCode,
  //       HasWarehouse: companyData.CompanyBranch[0].HasWarehouse,
  //       IsMainBranch: true,
  //       Latitude:companyData.CompanyBranch[0].Latitude.toFixed(6),
  //       Longitude: companyData.CompanyBranch[0].Longitude.toFixed(6)
  //     }
  //   })

    

  //   // return await this.prisma.$transaction(async (tx) => {
      
  //   // });

    
  // }
}
