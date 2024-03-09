import { RequestHandler } from 'express';
import { WordsListService } from '../Services/wordsList.service';

export class WordsListController {
    constructor(private wordsListService: WordsListService) {
        this.add = this.add.bind(this)
        this.rename = this.rename.bind(this)
        this.remove = this.remove.bind(this)
        this.showAllLists = this.showAllLists.bind(this)
        this.createQuiz = this.createQuiz.bind(this)
    }

    add:RequestHandler = async (req, res, next) => {
        try{
            const { name, toLanguage, fromLanguage } = req.body;
            const createdList = await this.wordsListService.add(name, toLanguage, fromLanguage);
            return res.status(201).json({
                success: true,
                createdList: createdList
            })  
        }catch(error){
            console.log(error);
            console.log("Error while creating words list")
            return new Error("WL creation error")
        }
    }

    rename:RequestHandler = async (req, res, next) => {
        try{
            const { id, newName } = req.body;
            const renamedList = await this.wordsListService.rename(id, newName)
            return res.status(200).json({
                success: true,
                list: renamedList
            })
        }catch(error){
            console.log(error)
        }
    }

    remove:RequestHandler = async (req, res, next) => {
        try{
            const { id } = req.body;
            const removedList = await this.wordsListService.remove(id);
            return res.status(201).json({
                success: true,
                removedWordListId: removedList
            })  
        }catch(error){
            console.log(error);
            console.log("Error while removing words list")
            return new Error("WL removing error")
        }
    }

    showAllLists:RequestHandler = async (req, res, next) => {
        try{
            const lists = await this.wordsListService.showAllLists();
            return res.status(200).json({
                success: true,
                lists: lists
            })
        }catch(error){
            console.log(error)
        }
    }

    createQuiz:RequestHandler = async (req, res, next) => {
        try{
            const { listId } = req.body;
            const quiz = await this.wordsListService.createQuiz(listId)
            return res.status(200).json({
                success: true,
                quiz: quiz
            })
        }catch(e){
            console.log(e)
        }
    }
}