export class Company {
  CompanyID: Number = 0;
  nCompany: String = "";
  Abbre: String = "";
  FiscalNumber: String = "";
  RLogo: any;
  LLogo: any;
  PrimaryHeader: String = "";
  SecondaryHeader: String = "";
  PrimaryFooter: String = "";
  SecondaryFooter: String = "";
  HasBranch: Boolean = false;
  Website: String = "";
  Email: String = "";
  PhoneNumber: Number = 0;
  UTC_CreateAT: Date = new Date();
  GTMM6_CreateAT: Date = new Date();

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
  }
}
