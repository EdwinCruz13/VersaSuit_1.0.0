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
    
    constructor(data: Partial<Contact>) {
        Object.assign(this, data);
      }
  }