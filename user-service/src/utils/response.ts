import type { Response } from "express";

export const success = (res:Response, data:any, code=200)=>{
    return res.status(code).json({success:true, data});
}

export const fail = (res:Response, message:string, code=400)=>{
    return res.status(code).json({success:false, message});
}