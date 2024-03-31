import { RequestHandler } from 'express';
import { WordPairService } from '../Services/wordPair.service';
import { ApiException } from '../Exceptions/ApiException';
import { DatabaseException } from '../Exceptions/DatabaseException';
import { container } from 'tsyringe';
import { WordTranslationDTO } from '../DTO/wordTranslationDTO.entity';

export class WordPairController{
    private wordPairService: WordPairService;

    constructor() {
        this.wordPairService = container.resolve(WordPairService);
    }

    getAllPairsByWordsListId:RequestHandler = async (req, res, next) => {
        try{
            const id:number = parseInt(req.params.id as string) 
            if(!id){
                throw new ApiException("No words list id provided", 400)
            }
            const resultList = await this.wordPairService.getAllPairsByListId(id)
            return res.status(200).json({
                success: true,
                resultList: resultList
            })
        }catch(error){
            if(error instanceof DatabaseException){
                res.status(error.statusCode).json({ success: false, message: error.message });
            }else if(error instanceof ApiException){
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    translateWord:RequestHandler = async (req, res, next) => {
        try{
            const { toLanguage, fromLanguage, wordToTranslate } = req.body;
            if(!toLanguage){
                throw new ApiException("No target language provided", 400)
            }
            if(toLanguage.length > 6){
                throw new ApiException("Length of target language is too big", 400)
            }
            if(!fromLanguage){
                throw new ApiException("No source language provided", 400)
            }
            if(fromLanguage.length > 6){
                throw new ApiException("Length of source language is too big", 400)
            }
            if(!wordToTranslate){
                throw new ApiException("No word to translate language provided", 400)
            }
            if(wordToTranslate.length > 99){
                throw new ApiException("Word to tranlsate is too long", 400)
            }
            const wordTranslationDTO:WordTranslationDTO= new WordTranslationDTO(toLanguage, fromLanguage, wordToTranslate)
            const wordsPair = await this.wordPairService.translateWord(wordTranslationDTO)
            return res.status(200).json({
                success: true,
                wordPair: wordsPair
            })
        }catch(error){
            if(error instanceof DatabaseException){
                res.status(error.statusCode).json({ success: false, message: error.message });
            }else if(error instanceof ApiException){
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    add:RequestHandler = async (req, res, next) => {
        try{
            const {fromWord, toWord, wordsListId} = req.body;
            if(!toWord){
                throw new ApiException("No target word provided", 400)
            }
            if(toWord.length > 99){
                throw new ApiException("Target word is too long", 400)
            }
            if(!fromWord){
                throw new ApiException("No source word provided", 400)
            }
            if(fromWord.length > 99){
                throw new ApiException("Source word is too long", 400)
            }
            if(!wordsListId){
                throw new ApiException("No words list ID provided", 400)
            }
            const resultPairId = await this.wordPairService.add(fromWord, toWord, wordsListId)
            return res.status(200).json({
                success: true,
                wordsPairId: resultPairId
            })
        }catch(error){
            if(error instanceof DatabaseException){
                res.status(error.statusCode).json({ success: false, message: error.message });
            }else if(error instanceof ApiException){
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    remove:RequestHandler = async (req, res, next) => {
        try{
            const {pairId} = req.body;
            if(!pairId){
                throw new ApiException("No pair ID provided", 400)
            }
            const removePairId = await this.wordPairService.remove(pairId)
            return res.status(200).json({
                success: true,
                wordsPairId: removePairId
            })
        }catch(error){
            if(error instanceof DatabaseException){
                res.status(error.statusCode).json({ success: false, message: error.message });
            }else if(error instanceof ApiException){
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
}