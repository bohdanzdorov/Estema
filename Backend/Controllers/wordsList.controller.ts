import { RequestHandler } from 'express';
import { WordsListService } from '../Services/wordsList.service';
import { ApiException } from '../Exceptions/ApiException';
import { DatabaseException } from '../Exceptions/DatabaseException';
import { container } from 'tsyringe';
import { QuizQuestion } from '../DTO/quiz.entity';

export class WordsListController {
    private wordsListService: WordsListService;

    constructor() {
        this.wordsListService = container.resolve(WordsListService);
    }

    add: RequestHandler = async (req, res, next) => {
        try {
            const { name, toLanguage, fromLanguage } = req.body;
            const createdList = await this.wordsListService.add(name, toLanguage, fromLanguage);
            return res.status(201).json({
                success: true,
                createdList: createdList
            })
        } catch (error) {
            if (error instanceof DatabaseException) {
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else if (error instanceof ApiException) {
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    rename: RequestHandler = async (req, res, next) => {
        try {
            const { id, newName } = req.body;
            const renamedList = await this.wordsListService.rename(id, newName)
            return res.status(200).json({
                success: true,
                renamedList: renamedList
            })
        } catch (error) {
            if (error instanceof DatabaseException) {
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else if (error instanceof ApiException) {
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    remove: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.body;
            const removedList = await this.wordsListService.remove(id);
            return res.status(201).json({
                success: true,
                removedWordListId: removedList
            })
        } catch (error) {
            if (error instanceof DatabaseException) {
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else if (error instanceof ApiException) {
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    showAllLists: RequestHandler = async (req, res, next) => {
        try {
            const lists = await this.wordsListService.showAllLists();
            return res.status(200).json({
                success: true,
                lists: lists
            })
        } catch (error) {
            if (error instanceof DatabaseException) {
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else if (error instanceof ApiException) {
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    createQuiz: RequestHandler = async (req, res, next) => {
        try {
            const { listId, quizType } = req.query
            let quiz:QuizQuestion[]
            if (Number(quizType) == 1)
                quiz = await this.wordsListService.createQuizOneKnown(listId)
            else if(Number(quizType) == 2)
                quiz = await this.wordsListService.createQuizOneUnknown(listId)
            else if(Number(quizType) == 3){
                quiz = []
                const quizBuff1 = await this.wordsListService.createQuizOneKnown(listId)
                const quizBuff2 = await this.wordsListService.createQuizOneUnknown(listId)
                for(let i = 0; i < quizBuff1.length; i++){
                    quizBuff1[i].questionNumber = i*2+1
                    quiz.push(quizBuff1[i])
                    quizBuff2[i].questionNumber = i*2+2
                    quiz.push(quizBuff2[i])
                }
            }else
                throw new ApiException("Invalid quiz type", 400)
            return res.status(200).json({
                success: true,
                quiz: quiz
            })
        } catch (error) {
            if (error instanceof DatabaseException) {
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else if (error instanceof ApiException) {
                res.status(error.statusCode).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
}