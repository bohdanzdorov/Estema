import { error } from "console";
import { WordsList } from "../Models/wordsList.schema";

export class WordsListService{
    
    showAllLists:Function = async() =>{
        try{
            const allLists = await WordsList.find({}, 'id name toLanguage fromLanguage')
            return allLists;
        }catch(err){
            console.log(error)
            throw new Error("WL service getting lists error")
        }
    }

    add:Function = async(name: string, toLanguage: string, fromLanguage: string) =>{
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
    }

    rename:Function = async(id: string, newName: string) =>{
        try{
            const renameCandidate = await WordsList.findOne({ id: id });
            if (!renameCandidate) {
                throw new Error("!Cannot find word list with such id!")
            }
            const newList = WordsList.updateOne({id: id}, {$set: {name: newName}}).exec()
            return {id: id, newName: newName}
        }catch(error){
            console.log(error)
        }    
    }

    remove:Function  = async(id: string) =>{
        try{
            const removeCandidate = await WordsList.findOne({ id: id });
            if (!removeCandidate) {
            throw new Error("!Cannot find word list with such id!")
            }
            await WordsList.deleteOne({ id: id });
            return id;
        }catch(error){
            console.log(error)
            return new Error("Error while removing word list")
        }
    }
}