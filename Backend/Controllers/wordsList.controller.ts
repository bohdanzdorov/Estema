import { RequestHandler } from 'express';
import { create } from "../Services/wordsList.service";
  
export const add:RequestHandler = async (req, res, next) => {
    try{
        const name = (req.body as { name:string } ).name;
        const toLanguage = (req.body as {toLanguage: string}).toLanguage;
        const fromLanguage = (req.body as {fromLanguage: string}).fromLanguage;
        const createdList = await create(name, toLanguage, fromLanguage);
        return res.status(201).json({
            success: true,
            createdList: createdList
        })  
    }catch(error){
        console.log(error);
        console.log("Error while creating words list")
        return new Error("WL creation error")
    }
};

