import { Request, Response, NextFunction } from "express";

export default function errosMidd(err: Error, req: Request, res: Response, next: NextFunction){
    console.log(err);

    return res.json({message: "Ops, erro!"});

}