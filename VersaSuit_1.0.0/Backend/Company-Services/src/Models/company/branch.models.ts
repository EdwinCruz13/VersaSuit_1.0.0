import { Company } from "./company.models";
import { City } from "../common/City.models";

export class Branch {
  CompanyID: number = 0;
  BranchID: number = 0;
  CityID: number = 0;
  CountryID: number = 0;
  ManagerID: number = 0;
  Address: string = "";
  PhoneNumber: string = "";
  ExtNumber: number = 0;
  PostalCode: string = "";
  HasWarehouse: boolean = false;
  IsMainBranch: boolean = false;
  Latitude: number = 0.0;
  Longitude: number = 0.0;
  Company?: Company; // optional to avoid the circle dependency
  City?: City; // optional to avoid the circle dependency

  constructor(data: Partial<Branch>) {
    Object.assign(this, data);
  }
}
