import express, {Request, Response, Router} from 'express';
import { WordPair } from '../Models/wordPair.schema';

const router: Router= express.Router();

router.get('/addWordPair', (req: Request, res: Response) =>{
    return res.send("/addWordPair");
})

router.get('/removewordsPair', (req: Request, res: Response) =>{
    return res.send("/removewordsPair");
})

router.get('/translateWord', (req: Request, res: Response) =>{
    return res.send("/translateWord");
})

router.post('/testWordPair', async (req: Request, res: Response) => {
    const {id, fromWord, toWord, wordsListId} = req.body;
    const wordPair = WordPair.build({id, fromWord, toWord, wordsListId});
    await wordPair.save();
    return res.status(201).send(wordPair)
})


export {router as wordPairRouter} 