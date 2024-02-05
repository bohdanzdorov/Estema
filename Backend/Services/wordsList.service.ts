import { WordsList } from "../Models/wordsList.schema";


export const create:Function = async(name: string, toLanguage: string, fromLanguage: string) =>{
    try{
        
        const id = "0";
        const pairsCount = 0;
        const newWordsList = WordsList.build({id, name, pairsCount, toLanguage, fromLanguage});
        await newWordsList.save();
        return newWordsList;
    }catch(error){
        console.log("Error in service while creating words list")
        throw new Error("WL service creation error")
    }
};
