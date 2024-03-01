import { WordPair } from '../Models/wordPair.schema';

export class WordPairRepository{
    findByFromWord:Function = async(fromWord: string) =>{
        const findPair = await WordPair.find({fromWord : fromWord})
        return findPair
    }
    
    findById:Function = async(id: string) => {
        const findPair = await WordPair.findOne({ id: id });
        return findPair
    }

    addPair:Function = async(id:string, fromWord:string, toWord:string, wordsListId:string) => {
        const newWordPair = WordPair.build({id, fromWord, toWord, wordsListId})
        await newWordPair.save();
        return newWordPair
    }

    removeById:Function = async(id: string) => {
        await WordPair.deleteOne({ id: id });
    }
}