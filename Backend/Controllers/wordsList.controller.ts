import { RequestHandler } from 'express';
import { addService, removeService, getAllListsService, renameListService} from "../Services/wordsList.service";

export const rename:RequestHandler = async (req, res, next) => {
    try{
        const { id, newName } = req.body;
        const renamedList = await renameListService(id, newName)
        return res.status(200).json({
            success: true,
            list: renamedList
        })
    }catch(error){
        console.log(error)
    }
}

export const getAll:RequestHandler = async (req, res, next) => {
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
        const { name, toLanguage, fromLanguage } = req.body;
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

