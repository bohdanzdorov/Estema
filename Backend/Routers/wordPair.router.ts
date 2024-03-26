import express, {Request, Response, Router} from 'express';
import { WordPairController } from '../Controllers/wordPair.controller';

const router: Router= express.Router();
const wordPairController: WordPairController = new WordPairController()

router.get("/showWordPairsByListId/:id", (req: Request, res:Response, next) => wordPairController.getAllPairsByWordsListId(req, res, next))

router.post('/addWordPair', (req: Request, res:Response, next) => wordPairController.add(req, res, next))

router.delete('/removeWordPair', (req: Request, res:Response, next) => wordPairController.remove(req, res, next))

router.post('/translateWord', (req: Request, res:Response, next) => wordPairController.translateWord(req, res, next))

export {router as wordPairRouter} 