import * as deepl from 'deepl-node';
import { WordPairRepository } from '../Repository/wordPair.repository';
import { AddWordPairDTO } from '../DTO/addWordPairDTO.entity';

export class WordPairService{

    constructor(private wordPairRepository: WordPairRepository){}

    getAllPairsByListId:Function = async(wordsListId: string) => {
        try{
            const resultList = await this.wordPairRepository.findAllByListId(wordsListId);
            if(!resultList){
                throw new Error("No words list with such name")
            }
            return resultList
        }catch(error){
            console.log(error)
        }
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
            const addWordPairDTO = new AddWordPairDTO(id, fromWord, toWord, wordsListId)
            const newWordPair = this.wordPairRepository.addPair(addWordPairDTO)
            return newWordPair
        }catch(error){
            console.log(error)
        }
    }
    
    remove:Function = async(id: string) =>{
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