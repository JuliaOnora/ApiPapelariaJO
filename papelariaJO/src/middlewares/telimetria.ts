import { Request, Response, NextFunction } from "express";

export default async function telimet(req: Request, res: Response, next: NextFunction){
    console.log("Working telimet");

    const { method, url } = req;
    const trace = `${method} -> ${url}`;
    console.log(trace)

    console.time();
    await next();

    console.timeEnd();
};