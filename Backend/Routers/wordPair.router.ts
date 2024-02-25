import express, {Request, Response, Router} from 'express';
import { addWordPair, removeWordPair, translateWord } from '../Controllers/wordPair.controller';

const router: Router= express.Router();

router.post('/addWordPair', addWordPair)

router.post('/removeWordPair', removeWordPair)

router.post('/translateWord', translateWord)

export {router as wordPairRouter} 