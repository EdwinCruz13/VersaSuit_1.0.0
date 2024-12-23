import { PrismaClient } from "@prisma/client";
import { UnitMeasure } from "../Models/unitmeasure.models";
import { ModelMapper } from "../../../Utils/mapping.utils"

/**
 * class that contain all the functions to get and set the
 * UnitMeasure product UnitMeasure. using prisma ORM in order to get the information from database
 */
export class UnitMeasureRepository{
    private prisma = new PrismaClient();

    /**
     * get all the UnitMeasures
     */
    async FetchAll(): Promise<UnitMeasure[] | null>{
        const data = await this.prisma.unitMeasure.findMany();
        return ModelMapper.toMap(UnitMeasure, data) as UnitMeasure[];
    }

    /**
     * get an specific UnitMeasure 
     * @param UnitID 
     */
    async FetchByID(UnitID: Number): Promise<UnitMeasure | null>{
        const data = await this.prisma.unitMeasure.findUnique({where: {UnitID: Number(UnitID)}});
        return ModelMapper.toMap(UnitMeasure, data) as UnitMeasure;
    }

    /**
     * create a new UnitMeasure using prismaORM
     * return the new UnitMeasure
     */
    async Save(UnitMeasure: UnitMeasure): Promise<any>{
        try {
            //find the last saved UnitMeasure
            const lastUnitMeasure = await this.prisma.unitMeasure.findFirst({orderBy: {UnitID: "desc"}});

            const UnitID = (!lastUnitMeasure) ? 1: lastUnitMeasure.UnitID + 1;
            //save a new reg
            const newUnitMeasure = await this.prisma.unitMeasure.create({
                data: { UnitID: UnitID, nUnitMeasure: UnitMeasure.nUnitMeasure, nUnitType:UnitMeasure.nUnitType, UnitSymbol: UnitMeasure.UnitSymbol}
            })

            return { Message: "", data: newUnitMeasure };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific UnitMeasure
     * return the updated UnitMeasure
     */
    async Update(UnitMeasure: UnitMeasure): Promise<any>{
        try {

            //save a new properties
            const updateUnitMeasure = await this.prisma.unitMeasure.update({
                where: {UnitID: UnitMeasure.UnitID},
                data: { nUnitMeasure: UnitMeasure.nUnitMeasure, nUnitType:UnitMeasure.nUnitType, UnitSymbol: UnitMeasure.UnitSymbol}
            })
            return { Message: "", data: updateUnitMeasure };
        } catch (error) {
            return { Message: error, data: null };
        }
    }
}