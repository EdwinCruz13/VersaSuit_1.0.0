import { City } from "./City.models";

/**
 * Entity for country
 * set all the properties as default
 */
export class Country {
  CountryID: number = 0;
  eName: string = "";
  sName: string = "";
  Abbreviation: string = "";
  FlagUrl: string = "";
  Region: string = "";
  City?: City[];

  constructor(data: any) {
    this.CountryID = data.CountryID;
    this.eName = data.eName;
    this.sName = data.sName;
    this.Abbreviation = data.Abbreviation;
    this.FlagUrl = data.FlagUrl;
    this.Region = data.Region;
    this.City = data.City;
    // if (Array.isArray(data.City)) {
    //   this.City = data.City.map((City: any) => new City(City));
    // }
  }
}
