import { injectable } from 'tsyringe';
import { AddWordPairDTO } from '../DTO/addWordPairDTO.entity';
import { DatabaseException } from '../Exceptions/DatabaseException';
import { WordPair } from '../Models/wordPair.schema';

@injectable()
export class WordPairRepository{

    findAllByListId:Function = async(wordsListId: string) => {
        try{
            const resultList = await WordPair.find({ wordsListId: wordsListId })
            return resultList
        }catch(error){
            throw new DatabaseException('Database exception while finding Word pairs');
        }
    }

    findInListByFromWord:Function = async(wordsListId: string, fromWord: string) => {
        try{
            const findPair = await WordPair.findOne({wordsListId: wordsListId, fromWord: fromWord })
            return findPair
        }catch(error){
            throw new DatabaseException('Database exception while finding Word pair')
        }
    }

    findById:Function = async(id: string) => {
        try{
            const findPair = await WordPair.findOne({ id: id });
            return findPair
        }catch(error){
            throw new DatabaseException('Database exception while finding Word pair')
        }
    }

    addPair:Function = async(addWordPairDTO: AddWordPairDTO) => {
        try{
            const newWordPair = WordPair.build(addWordPairDTO)
            await newWordPair.save();
            return newWordPair
        }catch(error){
            throw new DatabaseException('Database exception while adding Word pair')
        }
    }
    
    removeById:Function = async(id: string) => {
        try{
            await WordPair.deleteOne({ id: id });
        }catch(error){
            throw new DatabaseException('Database exception while removing Word pair')
        }
    }
}