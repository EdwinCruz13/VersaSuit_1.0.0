import { PrismaClient } from "@prisma/client";

/**
 * class that contain all the functions to get and set the
 * model product Warehouse. using prisma ORM in order to get the information from database
 */
export class WarehouseRepository{
    private prisma = new PrismaClient();

    /**
     * get all the Warehouses by a company
     */
    async FetchAll(CompanyID: Number): Promise<any>{
        return await this.prisma.companyWarehouse.findMany({
            where: {CompanyID: Number(CompanyID)}, 
            include: { CompanyBranch: true}
        });
    }

    /**
     * get an specific WarehouseID 
     * @param WarehouseID 
     */
    async FetchByID(BranchID: Number, WarehouseID: Number): Promise<any>{
        return this.prisma.companyWarehouse.findUnique({
            where: { BranchID_WarehouseID: {WarehouseID: Number(WarehouseID), BranchID: Number(BranchID)}},
            include: { CompanyBranch: true}
        });
    }

    /**
     * create a new Warehouse using prismaORM
     * return the new Warehouse
     */
    async Save(Warehouse: any): Promise<any>{
        try {
            //get the last index of company Warehouse
            const LastWarehouse = await this.prisma.companyWarehouse.findFirst({where: {BranchID: Warehouse.BranchID}, orderBy: {WarehouseID: "desc"}})
            const WarehouseID = (!LastWarehouse) ? 1 : LastWarehouse.WarehouseID + 1;

            //create a new data
            const newWarehouse = await this.prisma.companyWarehouse.create({
                data: {
                WarehouseID: WarehouseID,
                CompanyID: Warehouse.CompanyID,
                BranchID: Warehouse.BranchID,
                nWarehouse: Warehouse.nWarehouse,
                Description: Warehouse.Description,
                Address: Warehouse.Address,
                Status: Warehouse.Status,
            }})

            return { Message: "", data: newWarehouse };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific Warehouse
     * return the updated Warehouse
     */
    async Update(Warehouse: any): Promise<any>{
        try {
            //create a new data
            const updatedWarehouse = await this.prisma.companyWarehouse.update({
                where: { BranchID_WarehouseID: {WarehouseID: Number(Warehouse.WarehouseID), BranchID: Number(Warehouse.BranchID)}},
                data: {nWarehouse: Warehouse.nWarehouse, Description: Warehouse.Description, Status: Warehouse.Status}
            })

            return { Message: "", data: updatedWarehouse };
        } catch (error) {
            return { Message: error, data: null };
        }
    }
}