import { RequestHandler } from 'express';
import { addService, removeService } from "../Services/wordsList.service";

export const getAllLists:RequestHandle = async (req, res, next) => {
    try{
        const lists = await getAllListsService();
        return res.status(200).json({
            success: true,
            lists: lists
        })
    }catch(error){
        console.log(error)
    }
}
  
export const add:RequestHandler = async (req, res, next) => {
    try{
        const name = (req.body as { name:string } ).name;
        const toLanguage = (req.body as {toLanguage: string}).toLanguage;
        const fromLanguage = (req.body as {fromLanguage: string}).fromLanguage;
        const createdList = await addService(name, toLanguage, fromLanguage);
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

export const remove:RequestHandler = async (req, res, next) => {
    try{
        const id = (req.body as { id:string } ).id;
        const removedList = await removeService(id);
        return res.status(201).json({
            success: true,
            removedWordListId: removedList
        })  
    }catch(error){
        console.log(error);
        console.log("Error while removing words list")
        return new Error("WL removing error")
    }
}

