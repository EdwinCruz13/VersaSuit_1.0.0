import { Router } from "express";
import { GetUsers } from "../Controllers/users.controllers";

//create a new router
const UserRouter = Router();


//create the enpoints request
// GET  /api/v1/users/getusers             ------>(gets all users)
// GET  /api/v1/users/getuser/:UserID      ------>(gets a single user)
// POST /api/v1/users/createuser           ------>(create a new user)
// PUT  /api/v1/users/getuser/:UserID      ------>(update a user)
// DELETE /api/v1/users/deleteuser/:UserID ------>(delete a user)
UserRouter.get("/getusers", GetUsers);

//return the router
export default UserRouter;