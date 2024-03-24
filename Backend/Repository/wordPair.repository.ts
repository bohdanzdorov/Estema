import { AddWordPairDTO } from '../DTO/addWordPairDTO.entity';
import { WordPair } from '../Models/wordPair.schema';

export class WordPairRepository{

    findAllByListId:Function = async(wordsListId: string) =>{
        const resultList = await WordPair.find({ wordsListId: wordsListId })
        return resultList
    }

    findByFromWord:Function = async(fromWord: string) =>{
        const findPair = await WordPair.find({ fromWord: fromWord })
        return findPair
    }
    
    findById:Function = async(id: string) => {
        const findPair = await WordPair.findOne({ id: id });
        return findPair
    }

    addPair:Function = async(addWordPairDTO: AddWordPairDTO) => {
        const newWordPair = WordPair.build(addWordPairDTO)
        await newWordPair.save();
        return newWordPair
    }

    removeById:Function = async(id: string) => {
        await WordPair.deleteOne({ id: id });
    }
}