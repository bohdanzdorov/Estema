import * as deepl from 'deepl-node';
import { WordPairRepository } from '../Repository/wordPair.repository';
import { AddWordPairDTO } from '../DTO/addWordPairDTO.entity';
import { ApiException } from '../Exceptions/ApiException';
import { DatabaseException } from '../Exceptions/DatabaseException';
import { ExternalApiException } from '../Exceptions/ExternalApiException';
import { WordsListRepository } from '../Repository/wordsList.repository';

export class WordPairService{

    constructor(private wordPairRepository: WordPairRepository, private wordsListRepository: WordsListRepository){}

    getAllPairsByListId:Function = async(wordsListId: string) => {
        try{
            const resultList = await this.wordPairRepository.findAllByListId(wordsListId);
            return resultList
        }catch(error){
            if(error instanceof DatabaseException){
                throw new DatabaseException(error.message)
            }
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
            throw new ExternalApiException('Exception occured while translating the word')
        }
    }
    
    add:Function = async(fromWord:string, toWord:string, wordsListId: string) =>{
        try{
            const isListExist = await this.wordsListRepository.findById(wordsListId)
            if(!isListExist){
                throw new ApiException("List with such id does not exist", 400)
            }
            const addCandidate = await this.wordPairRepository.findInListByFromWord(wordsListId, fromWord);
            if(addCandidate){
                throw new ApiException("Such word already exists in this word list", 400)
            }
            const id = String(new Date().getTime())
            const addWordPairDTO = new AddWordPairDTO(id, fromWord, toWord, wordsListId)
            const newWordPair = this.wordPairRepository.addPair(addWordPairDTO)
            return newWordPair
        }catch(error){
            if(error instanceof DatabaseException){
                throw new DatabaseException(error.message)
            }else if(error instanceof ApiException){
                throw new ApiException(error.message, error.statusCode)
            }
        }
    }
    
    remove:Function = async(id: string) =>{
        try{
            const removeCandidate = await this.wordPairRepository.findById(id);
            if (!removeCandidate) {
              throw new ApiException("Cannot find word list with such id", 400)
            }
            await this.wordPairRepository.removeById(id)
            return id;
        }catch(error){
            if(error instanceof DatabaseException){
                throw new DatabaseException(error.message)
            }else if(error instanceof ApiException){
                throw new ApiException(error.message, error.statusCode)
            }
        }
    }
}