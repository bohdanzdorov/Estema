import express, {Request, Response, Router} from 'express';
import { WordPairController } from '../Controllers/wordPair.controller';
import { WordPairService } from '../Services/wordPair.service';

let wordPairController = new WordPairController(new WordPairService)
const router: Router= express.Router();

router.post('/addWordPair', (req: Request, res:Response, next) => wordPairController.add(req, res, next))

router.post('/removeWordPair', (req: Request, res:Response, next) => wordPairController.remove(req, res, next))

router.post('/translateWord', (req: Request, res:Response, next) => wordPairController.translateWord(req, res, next))

export {router as wordPairRouter} 