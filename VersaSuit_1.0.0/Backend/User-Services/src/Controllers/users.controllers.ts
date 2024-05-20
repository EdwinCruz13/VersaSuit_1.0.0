import { Request, Response } from "express";


/**
 * get the list of users from a database
 * @param req 
 * @param resp 
 */
export const GetUsers = async(req: Request, resp: Response): Promise<void> => {
    console.log("GetUsers controllers");
    try {
        //get all the user create in Postgres
        const Users = await [{ Username: "EdwinCruz", Email: "edwin.cruz13@hotmail.com"}]

        //return the list
        resp.status(200).json(Users);
    } catch (error) {
        resp.status(500).json({ error: "error: " + error });
    }
}