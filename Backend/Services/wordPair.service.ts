import * as deepl from 'deepl-node';
import { WordPairRepository } from '../Repository/wordPair.repository';

export class WordPairService{

    constructor(private wordPairRepository: WordPairRepository){

    }

    translateWord:Function = async(fromWord: string) =>{
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
    
    add:Function = async(fromWord:string, toWord:string, wordsListId: string) =>{
        try{
            const addCandidate = await this.wordPairRepository.findByFromWord(fromWord);
            if(addCandidate != 0){
                console.log("error duplicate")
            }
            const id = String(new Date().getTime())
            const newWordPair = this.wordPairRepository.addPair(id, fromWord, toWord, wordsListId)
            return newWordPair
        }catch(error){
            console.log(error)
        }
    }
    
    remove:Function  = async(id: string) =>{
        try{
            const removeCandidate = await this.wordPairRepository.findById(id);
            if (!removeCandidate) {
              throw new Error("!Cannot find word list with such id!")
            }
            await this.wordPairRepository.removeById(id)
            return id;
        }catch(error){
            console.log(error)
            return new Error("Error while removing word list")
        }
    }
}