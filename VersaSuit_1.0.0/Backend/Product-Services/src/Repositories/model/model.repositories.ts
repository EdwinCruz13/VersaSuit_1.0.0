import { PrismaClient } from "@prisma/client";
import { Model } from "../../Models/model/model.models";
import { ModelMapper } from "../../../../Utils/mapping.utils"

/**
 * class that contain all the functions to get and set the
 * model product Model. using prisma ORM in order to get the information from database
 */
export class ModelRepository{
    private prisma = new PrismaClient();

    /**
     * get all the Models by a company
     */
    async FetchAll(CompanyID: Number): Promise<Model[] | null>{
        const data = await this.prisma.model.findMany({where: {CompanyID: Number(CompanyID)}});
        return ModelMapper.toMap(Model, data) as Model[];
    }

    /**
     * get an specific Model 
     * @param ModelID 
     */
    async FetchByID(CompanyID: Number, ModelID: Number): Promise<Model | null>{
        const data = await this.prisma.model.findUnique({
            where: {CompanyID_ModelID : {CompanyID: Number(CompanyID), ModelID: Number(ModelID)}}
        });
        return ModelMapper.toMap(Model, data) as Model;
    }

    /**
     * create a new Model using prismaORM
     * return the new Model
     */
    async Save(Model: Model): Promise<any>{
        try {
            //find the last saved model
            const lastModel = await this.prisma.model.findFirst({
                where: {CompanyID: Model.CompanyID, },
                orderBy: {ModelID: "desc"}
            });

            const ModelID = (!lastModel) ? 1: lastModel.ModelID + 1;
            //save a new reg
            const newModel = await this.prisma.model.create({
                data: { ModelID: ModelID, CompanyID: Model.CompanyID, nModel: Model.nModel}
            })

            return { Message: "", data: newModel };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific Model
     * return the updated Model
     */
    async Update(Model: Model): Promise<any>{
        try {
            //find the model in order to validate
            const data = await this.prisma.model.findUnique({
                where: {CompanyID_ModelID : {CompanyID: Number(Model.CompanyID), ModelID: Number(Model.ModelID)}}
            });

            //if there is no data
            if(!data)
                return { Message: "Model has not been found, nothing to uptade", data: null };


            //save a new properties
            const updateModel = await this.prisma.model.update({
                where: {CompanyID_ModelID: {CompanyID: Number(Model.CompanyID), ModelID: Number(Model.ModelID)}},
                data: { nModel: Model.nModel}
            })
            return { Message: "", data: updateModel };
        } catch (error) {
            return { Message: error, data: null };
        }
    }
}