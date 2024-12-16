import { Request, Response, NextFunction } from "express";

//extend the inteface for all the project,
declare module "express-serve-static-core" {
  interface Response 
  {
    sendResponse: (data?: any, message?: string, error?: boolean, statusCode ?: number) => void;
  }
}

// this middleware will help to send an according response
//adding the following structure: {Error: false, Message: "", Data: {result}/[{result}]}
const responseMiddleware = ( req: Request, res: Response, next: NextFunction): void => {
  res.sendResponse = (data = null, message = "", error = false, statusCode = 200) => {
    res.status(statusCode).json({Error: error, Message: message, Data: data});
  };
  next();
};

export default responseMiddleware;
