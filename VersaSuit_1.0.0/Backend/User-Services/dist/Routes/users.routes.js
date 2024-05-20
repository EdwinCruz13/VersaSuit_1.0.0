"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../Controllers/users.controllers");
//create a new router
const UserRouter = (0, express_1.Router)();
//create news http request
UserRouter.get("/getusers", users_controllers_1.GetUsers);
//return the router
exports.default = UserRouter;
