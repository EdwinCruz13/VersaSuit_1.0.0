import { CompanyBranch } from "./branch.models";

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
  CompanyBranch?: CompanyBranch[]= [];

  constructor(data: any) {
    this.CompanyID = data.CompanyID;
    this.nCompany = data.nCompany;
    this.Abbre = data.Abbre;
    this.FiscalNumber = data.FiscalNumber;
    this.RLogo = data.RLogo;
    this.LLogo = data.LLogo;
    this.PrimaryHeader = data.PrimaryHeader;
    this.SecondaryHeader = data.SecondaryHeader;
    this.PrimaryFooter = data.PrimaryFooter;
    this.SecondaryFooter = data.SecondaryFooter;
    this.HasBranch = data.HasBranch;
    this.Website = data.Website;
    this.Email = data.Email;
    this.PhoneNumber = data.PhoneNumber;
    this.UTC_CreateAT = data.UTC_CreateAT;
    this.GTMM6_CreateAT = data.GTMM6_CreateAT;
    this.CompanyBranch = data.CompanyBranch;
    // if (Array.isArray(data.CompanyBranch)) {
    //   this.CompanyBranch = data.CompanyBranch.map((branchData: any) => new CompanyBranch(branchData));
    // }
  }
}
