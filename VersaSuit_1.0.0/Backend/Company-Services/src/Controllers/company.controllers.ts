import { Request, Response } from "express";

/**
 * export the list of companies
 * @param req 
 * @param resp 
 */
export const GetCompanies = async(req: Request, resp: Response) : Promise<void> => {
    console.log("get companies");
    try {
        const companies = await [{Names: "newBegin", Description: "hello new Begin"}] ;

        //return the list
        resp.status(200).json(companies);
    } catch (error) {
        resp.status(500).json({ error: "error: " + error });
    }
}