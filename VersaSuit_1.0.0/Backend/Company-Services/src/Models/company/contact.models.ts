import { Company } from "./company.models";

/**
 * Entity for company contact
 */
export class Contact {
    ContactID: number = 0;
    CompanyID: number = 0;
    nContact: string = "";
    PhoneContact: string = "";
    EmailContact?: string = "";
    Company?: Company; // optional to avoid the circle dependency
    
    constructor(data: any) {
        this.ContactID= data.ContactID;
        this.CompanyID= data.CompanyID;
        this.nContact= data.nContact;
        this.PhoneContact= data.PhoneContact;
        this.EmailContact= data.EmailContact;
        this.Company = data.Company ? new Company(data.Company) : undefined;
    }
  }