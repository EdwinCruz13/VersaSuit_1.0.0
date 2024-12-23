import { Branch } from "./branch.models";
import { SocialMedia } from "./socialmedia.models";
import { Contact } from "./contact.models";

export class Company {
  CompanyID: number = 0;
  nCompany: string = "";
  Abbre: string = "";
  FiscalNumber: string = "";
  RLogo: any;
  LLogo: any;
  PrimaryHeader: string = "";
  SecondaryHeader: string = "";
  PrimaryFooter: string = "";
  SecondaryFooter: string = "";
  HasBranch: boolean = false;
  Website: string = "";
  Email: string = "";
  PhoneNumber: string = "";
  UTC_CreateAT: Date = new Date();
  GTMM6_CreateAT: Date = new Date();
  CompanyBranch?: Branch[]= [];
  CompanyContact?: Contact[] = [];
  CompanySocialMedia?: SocialMedia[] = [];

  constructor(data: Partial<Company>) {
    Object.assign(this, data);
  }
}
