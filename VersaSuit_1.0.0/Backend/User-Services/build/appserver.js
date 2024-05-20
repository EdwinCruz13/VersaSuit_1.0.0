"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import routers from route module
const users_routes_1 = __importDefault(require("./Routes/users.routes"));
//create a new express server
const AppServer = (0, express_1.default)();
// set a new port and type of http request
AppServer.set("port", 3000);
AppServer.use(express_1.default.json());
// API ENDPOINTS
AppServer.use("/api/v1/users", users_routes_1.default);
//export the appserver
exports.default = AppServer;
