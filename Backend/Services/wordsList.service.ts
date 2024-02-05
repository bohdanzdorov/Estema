import { error } from "console";
import { WordsList } from "../Models/wordsList.schema";


export const addService:Function = async(name: string, toLanguage: string, fromLanguage: string) =>{
    try{
        const addCandidate = await WordsList.findOne({ name: name });

        if (addCandidate) {
          throw new Error("!Duplicate name error!");
        }
        const id = String(new Date().getTime())
        const pairsCount = 0;
        const newWordsList = WordsList.build({id, name, pairsCount, toLanguage, fromLanguage});
        await newWordsList.save();
        return newWordsList;
    }catch(error){
        console.log(error)
        throw new Error("WL service creation error")
    }
};

export const removeService:Function  = async(id: string) =>{
    try{
        const removeCandidate = await WordsList.findOne({ id: id });

        if (!removeCandidate) {
          throw new Error("!Cannot find word list with such id!")
        }
        await WordsList.deleteOne({ id: id });

        return id;
    }catch(e){
        console.log(error)
        return new Error("Error while removing word list")
    }
}