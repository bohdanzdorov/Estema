import { WordPair } from "../Models/wordPair.schema"
import { WordsList } from "../Models/wordsList.schema"

export class WordsListRepository {
    showAllLists:Function = async() => {
        throw new Error("Error!!!!")
        const allLists = await WordsList.find({}, 'id name toLanguage fromLanguage')
        return allLists
    }
    findById:Function = async(id: string) => {
        const findCandidate = await WordsList.findOne({ id: id });
        return findCandidate;
    }
    findByName:Function = async(name: string) => {
        const findCandidate = await WordsList.findOne({ name: name });
        return findCandidate;
    }
    add:Function = async(id:string, name:string, pairsCount:number, toLanguage:string, fromLanguage:string) => {
        const newWordsList = WordsList.build({id, name, pairsCount, toLanguage, fromLanguage});
        await newWordsList.save();
        return newWordsList
    }
    updateName:Function = async(id: string, newName:string) => {
        WordsList.updateOne({id: id}, {$set: {name: newName}}).exec()
        return newName
    }
    deleteById:Function = async(id: string) => {
        await WordsList.deleteOne({ id: id });
        return id
    }
    getWordPairsFromList:Function = async(listId: string) => {
        const wordPairs = await WordPair.find({wordsListId: listId})
        return wordPairs
    }
}