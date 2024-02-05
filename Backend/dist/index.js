"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const wordsList_router_1 = require("./Routers/wordsList.router");
const wordPair_router_1 = require("./Routers/wordPair.router");
require('dotenv').config();
const port = Number(process.env.PORT);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/wordsList", wordsList_router_1.wordsListRouter);
app.use("/wordPair", wordPair_router_1.wordPairRouter);
app.get("/", (req, res) => {
    res.send("Hello world!");
});
mongoose_1.default.connect(`${process.env.DB_CONNECTION_STRING}`);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
