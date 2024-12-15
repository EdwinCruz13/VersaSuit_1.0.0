import { Country } from "./Country.models";
import { CompanyBranch } from "../company/branch.models";

export class City {
  CityID: number = 0;
  CountryID: number = 0;
  nCity: string = "";
  StateCode: string = "";
  Timezone: string = "";;
  Country?: Country;
  companyBranches?: CompanyBranch[]

  constructor(data: any) {
    this.CityID = data.CityID;
    this.CountryID = data.CountryID;
    this.nCity = data.nCity;
    this.StateCode = data.StateCode;
    this.Timezone = data.Timezone;
    this.Country = data.Country;
    this.companyBranches = data.companyBranches;
  }
}
