import express, {Request, Response, Router} from 'express';

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

export {router as wordsListRouter} 