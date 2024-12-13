import { Company } from "./company.models";

export class Branch {

    BranchID: number = 0;
    CityID: number = 0;
    CountryID: number = 0;
    ManagerID: number = 0;
    Address: string = "";
    PhoneNumber: number = 0;
    ExtNumber: number = 0;
    PostalCode: string = "";
    HasWarehouse: boolean = false;
    IsMainBranch: boolean = false;
    Latitude: number = 0.00;
    Longitude: number = 0.00;
    Company: Company = new Company(null);
    
  
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
        this.Company= data.Company;
    }
  }