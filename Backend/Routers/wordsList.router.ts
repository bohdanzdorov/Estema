import express, {Request, Response, Router} from 'express';
import { WordsListController } from '../Controllers/wordsList.controller';
import { WordsListService} from '../Services/wordsList.service';
import { WordsListRepository } from '../Repository/wordsList.repository';

const router: Router= express.Router();
const wordsListController: WordsListController = new WordsListController()

// let wordsListService = new WordsListService(new WordsListRepository)
// let wordsListController = new WordsListController(wordsListService);

router.get('/showWordsLists', (req: Request, res:Response, next) => wordsListController.showAllLists(req, res, next));

router.post('/addWordsList', (req: Request, res:Response, next) => wordsListController.add(req, res, next))

router.delete('/removeWordsList', (req: Request, res:Response, next) => wordsListController.remove(req, res, next))

router.put('/renameWordsList', (req: Request, res:Response, next) => wordsListController.rename(req, res, next))

router.get('/createQuiz', (req: Request, res: Response, next) =>  wordsListController.createQuiz(req, res, next))

export {router as wordsListRouter} 