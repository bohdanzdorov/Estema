import { injectable } from "tsyringe"
import { AddWordsListDTO } from "../DTO/addWordsListDTO"
import { DatabaseException } from "../Exceptions/DatabaseException"
import { WordPair } from "../Models/wordPair.schema"
import { WordsList } from "../Models/wordsList.schema"

@injectable()
export class WordsListRepository {

    showAllLists:Function = async() => {
        try{
            const allLists = await WordsList.find({}, 'id name toLanguage fromLanguage')
            return allLists
        }catch(error){
            throw new DatabaseException('Database exception while finding Word lists')
        }
    }

    findWordPairsFromList:Function = async(wordsListId: string) => {
        try{
            const wordPairs = await WordPair.find({wordsListId: wordsListId})
            return wordPairs
        }catch(error){
            throw new DatabaseException('Database exception while finding Word pairs by List id')
        }
    }

    findById:Function = async(id: string) => {
        try{
            const findCandidate = await WordsList.findOne({ id: id });
            return findCandidate;
        }catch(error){
            throw new DatabaseException('Database exception while finding Word list')
        }
    }

    findByName:Function = async(name: string) => {
        const findCandidate = await WordsList.findOne({ name: name });
        return findCandidate;
    }

    add:Function = async(addWordsListDTO: AddWordsListDTO) => {
        try{
            const newWordsList = WordsList.build(addWordsListDTO);
            await newWordsList.save();
            return newWordsList
        }catch(error){
            throw new DatabaseException('Database exception while adding Word lists')
        }        
    }

    updateName:Function = async(id: string, newName:string) => {
        try{
            WordsList.updateOne({id: id}, {$set: {name: newName}}).exec()
            return newName
        }catch(error){
            throw new DatabaseException('Database exception while updating Word lists')
        }
    }
    
    deleteById:Function = async(id: string) => {
        try{
            await WordsList.deleteOne({ id: id });
            return id
        }catch(error){
            throw new DatabaseException('Database exception while removing Word lists')
        }
    }
}