import express, {Request, Response, Router} from 'express';
import { WordsListController } from '../Controllers/wordsList.controller';
import { WordsListService } from '../Services/wordsList.service';

const router: Router= express.Router();
let wordsListController = new WordsListController(new WordsListService);

router.post('/addWordsList', (req: Request, res:Response, next) => wordsListController.add(req, res, next))

router.get('/getWordsLists', (req: Request, res:Response, next) => wordsListController.getAll(req, res, next));

router.post('/removeWordsList', (req: Request, res:Response, next) => wordsListController.remove(req, res, next))

router.post('/renameWordsList', (req: Request, res:Response, next) => wordsListController.rename(req, res, next))

router.get('/showWordsList', (req: Request, res: Response) =>{
    return res.send("/showWordsList");
})

router.get('/createQuiz', (req: Request, res: Response) =>{
    return res.send("/createQuiz");
})


export {router as wordsListRouter} 