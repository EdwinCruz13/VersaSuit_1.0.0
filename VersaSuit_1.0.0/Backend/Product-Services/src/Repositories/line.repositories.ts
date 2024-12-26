import { PrismaClient } from "@prisma/client";

/**
 * class that contain all the functions to get and set the
 * model product LineType. using prisma ORM in order to get the information from database
 */
export class LineTypeRepository{
    private prisma = new PrismaClient();

    /**
     * get all the LineTypes by a company
     */
    async FetchAll(CompanyID: Number): Promise<any>{
        return await this.prisma.lineTypes.findMany({where: {CompanyID: Number(CompanyID)}})
    }

    /**
     * get an specific LineTypeID 
     * @param LineTypeID 
     */
    async FetchByID(CompanyID: Number, LineTypeID: Number): Promise<any>{
        return this.prisma.lineTypes.findUnique({
            where: { CompanyID_LineID: {LineID: Number(LineTypeID), CompanyID: Number(CompanyID)}},
        });
    }

    /**
     * create a new LineType using prismaORM
     * return the new LineType
     */
    async Save(LineType: any): Promise<any>{
        try {
            //get the last index of company LineType
            const LastLineType = await this.prisma.lineTypes.findFirst({where: {CompanyID: LineType.CompanyID}, orderBy: {LineID: "desc"}})
            const LineID = (!LastLineType) ? 1 : LastLineType.LineID + 1;

            //create a new data
            const newLineType = await this.prisma.lineTypes.create({
                data: {
                LineID: LineID,
                CompanyID: LineType.CompanyID,
                nLine: LineType.nLine,
                Description: LineType.Description
            }})

            return { Message: "", data: newLineType };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific LineType
     * return the updated LineType
     */
    async Update(LineType: any): Promise<any>{
        
        try {
            //create a new data
            const updatedLineType = await this.prisma.lineTypes.update({
                where: { CompanyID_LineID: {LineID: Number(LineType.LineID), CompanyID: Number(LineType.CompanyID)}},
                data: {nLine: LineType.nLine, Description: LineType.Description}
            })

            return { Message: "", data: updatedLineType };
        } catch (error) {
            return { Message: error, data: null };
        }
    }
}