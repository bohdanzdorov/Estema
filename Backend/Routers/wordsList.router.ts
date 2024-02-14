import express, {Request, Response, Router} from 'express';
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


export {router as wordsListRouter} 