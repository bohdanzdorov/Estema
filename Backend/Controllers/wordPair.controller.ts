import { RequestHandler } from 'express';
import { WordPairService } from '../Services/wordPair.service';
import { ApiException } from '../Exceptions/ApiException';
import { DatabaseException } from '../Exceptions/DatabaseException';

export class WordPairController{
    constructor(private wordPairService: WordPairService){
        this.translateWord = this.translateWord.bind(this)
        this.add = this.add.bind(this)
        this.remove = this.remove.bind(this)        
        this.getAllPairsByWordsListId = this.getAllPairsByWordsListId.bind(this)
    }

    getAllPairsByWordsListId:RequestHandler = async (req, res, next) => {
        try{
            const { id } = req.body;
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
            const { word } = req.body;
            const wordsPair = await this.wordPairService.translateWord(word)
            return res.status(200).json({
                success: true,
                wordsPair: wordsPair
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

    add:RequestHandler = async (req, res, next) =>{
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

    remove:RequestHandler = async (req, res, next) =>{
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