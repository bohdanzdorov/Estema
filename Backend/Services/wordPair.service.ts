import * as deepl from 'deepl-node';
import { WordPair } from '../Models/wordPair.schema';

export const translateWordService:Function = async(fromWord: string) =>{
    try{
        const translationKey = process.env.TRANSLATION_KEY
        const translator = new deepl.Translator(`${translationKey}`);

        const result = await translator.translateText(fromWord, null, 'en-US');
        const toWord = result.text 
        return toWord;
    }catch(error){
        console.log(error)
    }
}

export const addWordPairService:Function = async(fromWord:string, toWord:string, wordsListId: string) =>{
    try{
        const addCandidate = await WordPair.find({fromWord : fromWord})
        console.log(addCandidate)
        const id = String(new Date().getTime())
        const newWordPair = WordPair.build({id, fromWord, toWord, wordsListId})
        await newWordPair.save();
        return newWordPair

    }catch(error){
        console.log(error)
    }
}

export const removeWordPairService:Function  = async(id: string) =>{
    try{
        const removeCandidate = await WordPair.findOne({ id: id });

        if (!removeCandidate) {
          throw new Error("!Cannot find word list with such id!")
        }
        await WordPair.deleteOne({ id: id });

        return id;
    }catch(error){
        console.log(error)
        return new Error("Error while removing word list")
    }
}