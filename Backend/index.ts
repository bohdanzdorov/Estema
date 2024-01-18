import express, {Express, Request, Response} from "express";
import {wordsListRouter} from "./Routers/wordsList.router";
import {wordPairRouter} from "./Routers/wordPair.router";

const port: number = 3000;

const app: Express = express();

app.use(express.json());

app.use("/wordsList", wordsListRouter);
app.use("/wordPair", wordPairRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})