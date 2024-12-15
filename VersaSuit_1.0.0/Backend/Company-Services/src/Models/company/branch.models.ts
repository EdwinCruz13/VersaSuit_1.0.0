import { Company } from "./company.models";
import { City } from "../common/City.models";

export class CompanyBranch {
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
    Latitude: number = 0.00;
    Longitude: number = 0.00;
    Company?: Company; // optional to avoid the circle dependency
    City?: City; // optional to avoid the circle dependency
    
    constructor(data: any) {
        this.BranchID= data.BranchID;
        this.CityID= data.CityID;
        this.CountryID=data.CountryID;
        this.ManagerID= data.ManagerID;
        this.Address= data.Address;
        this.PhoneNumber= data.PhoneNumber;
        this.ExtNumber= data.ExtNumber;
        this.PostalCode= data.PostalCode;
        this.HasWarehouse= data.HasWarehouse;
        this.IsMainBranch= data.IsMainBranch;
        this.Latitude= data.Latitude;
        this.Longitude= data.Longitude;
        this.Company = data.Company ? new Company(data.Company) : undefined;
        this.City = data.City ? new City(data.City) : undefined;
    }
  }