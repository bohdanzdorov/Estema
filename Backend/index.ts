import "reflect-metadata";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from "express";
import swaggerUi from 'swagger-ui-express';
const cors = require("cors");
import "./di/container.config"

import * as swaggerDocument from './swagger.json';

import { wordsListRouter } from "./Routers/wordsList.router";
import { wordPairRouter } from "./Routers/wordPair.router";

dotenv.config();

const port: number = Number(process.env.PORT);

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/wordsList", wordsListRouter);
app.use("/wordPair", wordPairRouter);

mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})