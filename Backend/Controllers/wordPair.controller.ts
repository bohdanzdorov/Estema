import { RequestHandler } from 'express';
import { translateWordService, addWordPairService, removeWordPairService } from '../Services/wordPair.service';


    export const translateWord:RequestHandler = async (req, res, next) => {
        try{
            const { word } = req.body;
            const wordsPair = await translateWordService(word)
            return res.status(200).json({
                success: true,
                wordsPair: wordsPair
            })
        }catch(error){
            console.log(error)
        }
    }

    export const addWordPair:RequestHandler = async (req, res, next) =>{
        try{
            const {fromWord, toWord, wordsListId} = req.body;
            const resultPairId = await addWordPairService(fromWord, toWord, wordsListId)
            return res.status(200).json({
                success: true,
                wordsPairId: resultPairId
            })
        }catch(error){
            console.log(error)
        }
    }

    export const removeWordPair:RequestHandler = async (req, res, next) =>{
        try{
            const {pairId} = req.body;
            const removePairId = await removeWordPairService(pairId)
            return res.status(200).json({
                success: true,
                wordsPairId: removePairId
            })
        }catch(error){
            console.log(error)
        }
    }



