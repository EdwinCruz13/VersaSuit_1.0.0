import express from "express";

const appServer = express();

appServer.set("port", 4000);
appServer.use(express.json());

appServer.listen(appServer.get("port"), () => {
    console.log(`hello i am a Server on port ${appServer.get("port")}`);
});