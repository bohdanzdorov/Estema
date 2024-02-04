import mongoose from "mongoose";

interface IWordPair {
    id: string;
    fromWord: string;
    toWord: string;
    wordsListId: string;
}

interface wordPairModelInterface extends mongoose.Model<WordPairDoc> {
    build(attr: IWordPair): WordPairDoc
}

interface WordPairDoc extends mongoose.Document {
    id: string;
    fromWord: string;
    toWord: string;
    wordsListId: string;
}

const wordPairSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    fromWord: {
        type: String,
        required: true
    },
    toWord: {
        type: String,
        required: true
    },
    wordsListId: {
        type: String,
        required: true
    }    
})

wordPairSchema.statics.build = (attr: IWordPair) => {
    return new WordPair(attr);
}

const WordPair = mongoose.model<WordPairDoc, wordPairModelInterface>("WordPairs", wordPairSchema)

export {WordPair}