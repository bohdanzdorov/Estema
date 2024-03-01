import { error } from "console";
import { WordsListRepository } from "../Repository/wordsList.repository";

export class WordsListService{
    
    constructor(private wordsListRepository: WordsListRepository){

    }

    showAllLists:Function = async() =>{
        try{
            const allLists = await this.wordsListRepository.showAllLists();
            return allLists;
        }catch(err){
            console.log(error)
            throw new Error("WL service getting lists error")
        }
    }

    add:Function = async(name: string, toLanguage: string, fromLanguage: string) =>{
        try{
            const addCandidate = await this.wordsListRepository.findByName(name);
            if (addCandidate) {
            throw new Error("!Duplicate name error!");
            }
            const id = String(new Date().getTime())
            const pairsCount = 0;
            const newWordsList = this.wordsListRepository.add(id, name, pairsCount, toLanguage, fromLanguage)
            return newWordsList;
        }catch(error){
            console.log(error)
            throw new Error("WL service creation error")
        }
    }

    rename:Function = async(id: string, newName: string) =>{
        try{
            const renameCandidate = await this.wordsListRepository.findById(id);
            if (!renameCandidate) {
                throw new Error("!Cannot find word list with such id!")
            }
            const newList = await this.wordsListRepository.updateName(id, newName)
            return {id: id, newName: newName}
        }catch(error){
            console.log(error)
        }    
    }

    remove:Function  = async(id: string) =>{
        try{
            const removeCandidate = await this.wordsListRepository.findById(id);
            if (!removeCandidate) {
            throw new Error("!Cannot find word list with such id!")
            }
            this.wordsListRepository.deleteById(id)
            return id;
        }catch(error){
            console.log(error)
            return new Error("Error while removing word list")
        }
    }
}