import express, {Request, Response, Router} from 'express';
import { WordsList } from '../Models/wordsList.schema';

const router: Router= express.Router();

router.get('/getWordsLists', (req: Request, res: Response) =>{
    return res.send("/getWordsLists");
})

router.get('/removeWordsList', (req: Request, res: Response) =>{
    return res.send("/removeWordsList");
})

router.get('/renameWordsList', (req: Request, res: Response) =>{
    return res.send("/renameWordsList");
})

router.get('/showWordsList', (req: Request, res: Response) =>{
    return res.send("/showWordsList");
})

router.get('/createQuiz', (req: Request, res: Response) =>{
    return res.send("/createQuiz");
})

router.post('/testWordsList', async (req: Request, res: Response) => {
    const {id, name, pairsCount, toLanguage, fromLanguage} = req.body;
    const wordsList = WordsList.build({id, name, pairsCount, toLanguage, fromLanguage});
    await wordsList.save();
    return res.status(201).send(wordsList)
})

export {router as wordsListRouter} 