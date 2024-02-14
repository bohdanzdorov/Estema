import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import express, {Express, Request, Response} from "express";

import {wordsListRouter} from "./Routers/wordsList.router";
import {wordPairRouter} from "./Routers/wordPair.router";


const port: number = Number(process.env.PORT);

const app: Express = express();

app.use(express.json());

app.use("/wordsList", wordsListRouter);
app.use("/wordPair", wordPairRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})