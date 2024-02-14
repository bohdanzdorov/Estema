import { RequestHandler } from 'express';
import { translateWordService } from '../Services/wordPair.service';


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




