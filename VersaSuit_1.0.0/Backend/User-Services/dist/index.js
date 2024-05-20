"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appServer = (0, express_1.default)();
appServer.set("port", 4000);
appServer.use(express_1.default.json());
appServer.listen(appServer.get("port"), () => {
    console.log(`hello i am a Server on port ${appServer.get("port")}`);
});
