import express, {Request, Response, Router} from 'express';

const router: Router= express.Router();

router.get('/addWordPair', (req: Request, res: Response) =>{
    return res.send("/addWordPair");
})

router.get('/removewordsPair', (req: Request, res: Response) =>{
    return res.send("/removewordsPair");
})

router.get('/translateWord', (req: Request, res: Response) =>{
    return res.send("/translateWord");
})

export {router as wordPairRouter} 