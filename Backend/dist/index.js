"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
require("./di/container.config");
const wordsList_router_1 = require("./Routers/wordsList.router");
const wordPair_router_1 = require("./Routers/wordPair.router");
const port = Number(process.env.PORT);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/wordsList", wordsList_router_1.wordsListRouter);
app.use("/wordPair", wordPair_router_1.wordPairRouter);
mongoose_1.default.connect(`${process.env.DB_CONNECTION_STRING}`);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
