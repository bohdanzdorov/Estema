import { RequestHandler } from 'express';
import { WordPairService } from '../Services/wordPair.service';

export class WordPairController{
    constructor(private wordPairService: WordPairService){
        this.translateWord = this.translateWord.bind(this)
        this.add = this.add.bind(this)
        this.remove = this.remove.bind(this)        
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
            console.log(error)
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
            console.log(error)
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
            console.log(error)
        }
    }
}