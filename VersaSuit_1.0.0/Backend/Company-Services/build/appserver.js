"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import routers from route module
const company_routes_1 = __importDefault(require("./Routes/company.routes"));
const branch_routes_1 = __importDefault(require("./Routes/branch.routes"));
const response_middleware_1 = __importDefault(require("./middleware/response.middleware"));
//create a new express server
const AppServer = (0, express_1.default)();
// set a new port and type of http request
AppServer.set("port", 4000);
AppServer.use(express_1.default.json());
//Middleware
AppServer.use(response_middleware_1.default);
// API ENDPOINTS
AppServer.use("/api/v1/settings/companies", company_routes_1.default);
AppServer.use("/api/v1/settings/branches", branch_routes_1.default);
//export the appserver
exports.default = AppServer;
