import { Branch } from "./branch.models";
import { Company } from "./company.models";

/**
 * this entity map the Warehouse
 */
export class Warehouse {
    WarehouseID: number = 0;
    BranchID: number=0;
    CompanyID: number = 0;
    nWarehouse: string = "";
    Address: string = "";
    Status: boolean = false;
    Branch?: Branch;
    Company?: Company;


  constructor(data: Partial<Warehouse>) {
    Object.assign(this, data);
  }
}
