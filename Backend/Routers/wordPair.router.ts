import express, {Request, Response, Router} from 'express';
import { translateWord } from '../Controllers/wordPair.controller';

const router: Router= express.Router();

router.get('/addWordPair', (req: Request, res: Response) =>{
    return res.send("/addWordPair");
})

router.get('/removewordsPair', (req: Request, res: Response) =>{
    return res.send("/removewordsPair");
})

router.post('/translateWord', translateWord)

export {router as wordPairRouter} 