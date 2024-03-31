import mongoose from "mongoose";

interface IWordsList {
    id: string;
    name: string;
    pairsCount: number;
    toLanguage: string;
    fromLanguage: string;
}

interface wordsListModelInterface extends mongoose.Model<WordsListDoc> {
    build(attr: IWordsList): WordsListDoc
}

interface WordsListDoc extends mongoose.Document {
    id: string;
    name: string;
    pairsCount: number;
    toLanguage: string;
    fromLanguage: string;
}

const wordsListSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pairsCount: {
        type: Number,
        required: true
    },
    toLanguage: {
        type: String,
        required: true
    },
    fromLanguage: {
        type: String,
        required: true
    }
})

wordsListSchema.statics.build = (attr: IWordsList) => {
    return new WordsList(attr);
}

const WordsList = mongoose.model<WordsListDoc, wordsListModelInterface>("WordsLists", wordsListSchema)

export { WordsList }