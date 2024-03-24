import express, {Request, Response, Router} from 'express';
import { WordPairController } from '../Controllers/wordPair.controller';
import { WordPairService } from '../Services/wordPair.service';
import { WordPairRepository } from '../Repository/wordPair.repository';

let wordPairService = new WordPairService(new WordPairRepository)
let wordPairController = new WordPairController(wordPairService)
const router: Router= express.Router();

router.get("/showWordPairsByListId", (req: Request, res:Response, next) => wordPairController.getAllPairsByWordsListId(req, res, next))

router.post('/addWordPair', (req: Request, res:Response, next) => wordPairController.add(req, res, next))

router.delete('/removeWordPair', (req: Request, res:Response, next) => wordPairController.remove(req, res, next))

router.post('/translateWord', (req: Request, res:Response, next) => wordPairController.translateWord(req, res, next))

export {router as wordPairRouter} 