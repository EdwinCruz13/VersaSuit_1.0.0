import AppServer from "./appserver";

//initialize the server
AppServer.listen(AppServer.get("port"), () => {
    console.log(`Server on port ${AppServer.get("port")}`);
});