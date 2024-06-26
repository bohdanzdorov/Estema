import * as deepl from 'deepl-node';
import { inject, injectable } from 'tsyringe';
import { WordPairRepository } from '../Repository/wordPair.repository';
import { AddWordPairDTO } from '../DTO/addWordPairDTO.entity';
import { ApiException } from '../Exceptions/ApiException';
import { DatabaseException } from '../Exceptions/DatabaseException';
import { ExternalApiException } from '../Exceptions/ExternalApiException';
import { WordsListRepository } from '../Repository/wordsList.repository';
import { WordTranslationDTO } from '../DTO/wordTranslationDTO.entity';

@injectable()
export class WordPairService {

    constructor(@inject('WordPairRepository') private wordPairRepository: WordPairRepository,
        @inject('WordsListRepository') private wordsListRepository: WordsListRepository) { }

    getAllPairsByListId: Function = async (wordsListId: string) => {
        try {
            const resultList = await this.wordPairRepository.findAllByListId(wordsListId);
            return resultList
        } catch (error) {
            if (error instanceof DatabaseException) {
                throw new DatabaseException(error.message)
            }
        }
    }

    translateWord: Function = async (wordTranslationDTO: WordTranslationDTO) => {
        try {
            const translationKey = process.env.TRANSLATION_KEY
            const translator = new deepl.Translator(`${translationKey}`);
            const sourceLanguage: deepl.SourceLanguageCode = wordTranslationDTO.fromLanguage as deepl.SourceLanguageCode
            const targetLanguage: deepl.TargetLanguageCode = wordTranslationDTO.toLanguage as deepl.TargetLanguageCode
            const result = await translator.translateText(wordTranslationDTO.wordToTranslate, sourceLanguage, targetLanguage);
            const wordPair = { fromWord: wordTranslationDTO.wordToTranslate, toWord: result.text }
            return wordPair;
        } catch (error) {
            throw new ExternalApiException('Exception occured while translating the word')
        }
    }

    add: Function = async (fromWord: string, toWord: string, wordsListId: string) => {
        try {
            const isListExist = await this.wordsListRepository.findById(wordsListId)
            if (!isListExist) {
                throw new ApiException("List with such id does not exist", 400)
            }
            const addCandidate = await this.wordPairRepository.findInListByFromWord(wordsListId, fromWord);
            if (addCandidate) {
                throw new ApiException("Such word already exists in this word list", 400)
            }
            const id = String(new Date().getTime())
            const addWordPairDTO = new AddWordPairDTO(id, fromWord, toWord, wordsListId)
            const newWordPairId = this.wordPairRepository.addPair(addWordPairDTO)
            return newWordPairId
        } catch (error) {
            if (error instanceof DatabaseException) {
                throw new DatabaseException(error.message)
            } else if (error instanceof ApiException) {
                throw new ApiException(error.message, error.statusCode)
            }
        }
    }

    remove: Function = async (id: string) => {
        try {
            const removeCandidate = await this.wordPairRepository.findById(id);
            if (!removeCandidate) {
                throw new ApiException("Cannot find word pair with such id", 400)
            }
            await this.wordPairRepository.removeById(id)
            return id;
        } catch (error) {
            if (error instanceof DatabaseException) {
                throw new DatabaseException(error.message)
            } else if (error instanceof ApiException) {
                throw new ApiException(error.message, error.statusCode)
            }
        }
    }
}