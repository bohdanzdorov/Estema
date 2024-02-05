import express, {Request, Response, Router} from 'express';
import { WordsList } from '../Models/wordsList.schema';
import { add, remove, getAll, rename} from '../Controllers/wordsList.controller';

const router: Router= express.Router();

router.post('/addWordsList', add)

router.get('/getWordsLists', getAll);

router.post('/removeWordsList', remove)

router.post('/renameWordsList', rename)

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