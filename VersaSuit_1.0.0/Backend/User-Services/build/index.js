"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appserver_1 = __importDefault(require("./appserver"));
//initialize the server
appserver_1.default.listen(appserver_1.default.get("port"), () => {
    console.log(`Server on port ${appserver_1.default.get("port")}`);
});
