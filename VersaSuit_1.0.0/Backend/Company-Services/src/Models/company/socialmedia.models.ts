import { Company } from "./company.models";

/**
 * Entity for company contact
 */
export class SocialMedia {
    SocialD: number = 0;
    CompanyID: number = 0;
    nMedia: string = "";
    UrlMedia: string = "";
    Company?: Company; // optional to avoid the circle dependency
    
    constructor(data: any) {
        this.SocialD= data.ContactID;
        this.CompanyID= data.CompanyID;
        this.nMedia= data.nMedia;
        this.UrlMedia= data.UrlMedia;
        this.Company = data.Company ? new Company(data.Company) : undefined;
    }
  }