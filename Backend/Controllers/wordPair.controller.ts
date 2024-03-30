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