"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../Controllers/users.controllers");
//create a new router
const UserRouter = (0, express_1.Router)();
//create the enpoints request
// GET  /api/v1/users/getusers             ------>(gets all users)
// GET  /api/v1/users/getuser/:UserID      ------>(gets a single user)
// POST /api/v1/users/createuser           ------>(create a new user)
// PUT  /api/v1/users/getuser/:UserID      ------>(update a user)
// DELETE /api/v1/users/deleteuser/:UserID ------>(delete a user)
UserRouter.get("/getusers", users_controllers_1.GetUsers);
//return the router
exports.default = UserRouter;
