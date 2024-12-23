import { PrismaClient } from "@prisma/client";
import { Color } from "../Models/color.models";
import { ModelMapper } from "../../../Utils/mapping.utils"

/**
 * class that contain all the functions to get and set the
 * Color product Color. using prisma ORM in order to get the information from database
 */
export class ColorRepository{
    private prisma = new PrismaClient();

    /**
     * get all the Colors by a company
     */
    async FetchAll(): Promise<Color[] | null>{
        const data = await this.prisma.color.findMany();
        return ModelMapper.toMap(Color, data) as Color[];
    }

    /**
     * get an specific Color 
     * @param ColorID 
     */
    async FetchByID(ColorID: Number): Promise<Color | null>{
        const data = await this.prisma.color.findUnique({where: {ColorID: Number(ColorID)}});
        return ModelMapper.toMap(Color, data) as Color;
    }

    /**
     * create a new Color using prismaORM
     * return the new Color
     */
    async Save(Color: Color): Promise<any>{
        try {
            //find the last saved Color
            const lastColor = await this.prisma.color.findFirst({orderBy: {ColorID: "desc"}});

            const ColorID = (!lastColor) ? 1: lastColor.ColorID + 1;
            //save a new reg
            const newColor = await this.prisma.color.create({
                data: { ColorID: ColorID, nColor: Color.nColor, Hexadecimal: Color.Hexadecimal.toUpperCase(), Red: Color.Red, Blue: Color.Blue, Green: Color.Green}
            })

            return { Message: "", data: newColor };
        } catch (error) {
            return { Message: error, data: null };
        }
    }

    /**
     * update a a especific Color
     * return the updated Color
     */
    async Update(Color: Color): Promise<any>{
        try {

            //save a new properties
            const updateColor = await this.prisma.color.update({
                where: {ColorID: Color.ColorID},
                data: { nColor: Color.nColor, Hexadecimal: Color.Hexadecimal.toUpperCase(), Red: Color.Red, Blue: Color.Blue, Green: Color.Green}
            })
            return { Message: "", data: updateColor };
        } catch (error) {
            return { Message: error, data: null };
        }
    }
}