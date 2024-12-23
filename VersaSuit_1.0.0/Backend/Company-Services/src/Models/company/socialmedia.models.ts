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
    
    constructor(data: Partial<SocialMedia>) {
        Object.assign(this, data);
      }
  }