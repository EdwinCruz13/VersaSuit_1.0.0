import { Request, Response } from "express";
import { CompanyService } from "../../Services/company/company.services";

/**
 * this controller is used as intermediate between the request from the client
 * and the answer from services layers
 * use http request and response
 */
export class CompanyController {
  private CompanyService = new CompanyService();

  /**
   * method http for get companies
   * return the list of companies in https
   * @param req
   * @param resp
   */
  async GetCompanies(req: Request, resp: Response): Promise<any> {
    try {
      const companies = await this.CompanyService.GetAll();
      if (!companies)
        return resp.status(200).json({Error: false, Message: "There is not companies saved",data: null});

      //return the list
      return resp.status(200).json(companies);
    } catch (error) {
      return resp.status(500).json({ Error: true, Message: "There is a fatal error finding the companies: " + error, data: null});
    }
  }

  /**
   * return a especific company
   * @param req
   * @param resp
   */
  async GetCompany(req: Request, resp: Response): Promise<any> {
    const { CompanyID } = req.params;
    try {
      const company = await this.CompanyService.GetByID(Number(CompanyID));

      
      //validate the result, in any case is null, send status 409
      if (!company) {
        return resp.status(200).json({Error: false,Message: "company has not been found",data: null});
      }

      //return the list
      resp.status(200).json(company);
    } catch (error) {
      return resp.status(500).json({Error: true, Message: "There is a fatal error finding the company: " + error, data: null});
    }
  }

  /**
   * this method create a new company
   * the main company automatically create the main branch
   * @param req
   * @param res
   */
  async CreateCompany(req: Request, resp: Response): Promise<any> {
    const { company } = req.body;
    console.log(req.body)
    try {
      const result = await this.CompanyService.Create(company);
      console.log(result);
      if (result.data == 0)
        return resp.status(409).json({Error: true,Message: "There is a problem creating a company" + result.Message, data: null});
      else
        return resp.status(201).json({Error: false,Message: "The company has been created",data: result.data});
    } catch (error) {
      return resp.status(500).json({Error: true,Message: "There is a fatal error creating the company: " + error, data: null});
    }
  }

  /**
   * this method update the an specific company
   * @param req 
   * @param resp 
   * @returns 
   */
  async UpdateCompany(req: Request, resp: Response): Promise<any> {
    const { company } = req.body;

    try {
      const result = await this.CompanyService.Update(company);
      if (result.Message.includes("already exists"))
        return resp.status(409).json({Error: true, Message: "There is a problem editing the company" + result.Message, data: null});

      else
        return resp.status(201).json({Error: false, Message: "The company has been updated", data: result.data});

    } catch (error) {
      return resp.status(500).json({Error: true, Message: "There is a fatal error creating the company: " + error,data: null});
    }
  }
}

// /**
//  * create a new company
//  * @param req
//  * @param res
//  */
// export const CreateCompany = async (req: Request, resp: Response) : Promise<void> => {
//   const { CityID, CountryID, ManagerID, Address, PhoneNumber, PostalCode, Email,  IsMainBranch, HasWarehouse, Website, Latitude, Longitude, Company } = req.body;

//   try {

//     //add the params as data in order to save,
//     //use query raw for store procedura
//     const result: any = await prisma.$queryRaw<
//       {Message: String, CompanyID: number, } //define the output
//     >
//     `
//     --this order must be fit according the stored procedure
//     DECLARE @CompanyID INT, @Message NVARCHAR(50);
//     EXEC CompanyCreate  @Message OUTPUT, @CompanyID OUTPUT, ${Company.nCompany}, ${Company.Abbre}, ${Company.FiscalNumber}, ${Address}, ${PhoneNumber},
//                         ${PostalCode}, ${Email}, ${Website},
//                         ${Company.PrimaryHeader}, ${Company.SecondaryHeader}, ${Company.PrimaryFooter}, ${Company.SecondaryFooter},
//                         ${Company.HasBranch}, ${HasWarehouse}, ${CityID}, ${CountryID}, ${ManagerID}, ${Company.RLogo}, ${Company.LLogo},
//                         ${Latitude}, ${Longitude};
//       SELECT @CompanyID AS CompanyID, @Message AS Message;
//     `;

//     // Extraer los valores de salida
//     const { CompanyID, Message } = result[0];

//     //validate the company has been saved
//     if(CompanyID == 0)
//       resp.status(409).json({CompanyID: CompanyID, Message: Message, Error: true});

//     else
//       resp.status(201).json({CompanyID: CompanyID, Message: Message, Error: false});

//   } catch (error) {
//     resp.status(500).json({ Message: "There is a fatal error creating the company: " + error, Error: true });
//   }
// };

// /**
//  * update a company
//  * @param req
//  * @param res
//  */
// export const UpdateCompany = async (req: Request, resp: Response) : Promise<void> => {
//   const { CityID, CountryID, ManagerID, Address, PhoneNumber, PostalCode, Email,  IsMainBranch, HasWarehouse, Website, Latitude, Longitude, Company } = req.body;
//   try {

//     //add the params as data in order to save,
//     //use query raw for store procedura
//     const result: any = await prisma.$queryRaw<
//       {Message: String } //define the output
//     >
//     `
//     --this order must be fit according the stored procedure
//     DECLARE @Message NVARCHAR(50);
//     EXEC CompanyUpdate  @Message OUTPUT, ${Company.CompanyID}, ${Company.nCompany}, ${Company.Abbre}, ${Company.FiscalNumber}, ${Address}, ${PhoneNumber},
//                                           ${PostalCode}, ${Email}, ${Website},
//                                           ${Company.PrimaryHeader}, ${Company.SecondaryHeader}, ${Company.PrimaryFooter}, ${Company.SecondaryFooter},
//                                           ${Company.HasBranch}, ${HasWarehouse}, ${CityID}, ${CountryID}, ${ManagerID}, ${Company.RLogo}, ${Company.LLogo},
//                                           ${Latitude}, ${Longitude};
//       SELECT @Message AS Message;
//     `;

//     // Extraer los valores de salida
//     const { Message  } = result[0];

//     //validate the company has been saved
//     if(Message.includes("already exists"))
//       resp.status(409).json({CompanyID: Company.CompanyID, Message: Message, Error: true});

//     else
//       resp.status(201).json({CompanyID: Company.CompanyID, Message: Message, Error: false});

//   } catch (error) {
//     resp.status(500).json({ Message: "There is a fatal error editing the company: " + error, Error: true });
//   }
// };
