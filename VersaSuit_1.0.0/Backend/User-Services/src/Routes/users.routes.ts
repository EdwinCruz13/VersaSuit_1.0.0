import { Router } from "express";
import { GetUsers } from "../Controllers/users.controllers";

//create a new router
const UserRouter = Router();

//create news http request
UserRouter.get("/getusers", GetUsers);

//return the router
export default UserRouter;