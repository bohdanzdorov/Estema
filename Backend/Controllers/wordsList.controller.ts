import { RequestHandler } from 'express';
import { WordsListService } from '../Services/wordsList.service';

export class WordsListController {
    constructor(private wordsListService: WordsListService) {
        this.add = this.add.bind(this)
        this.getAll = this.getAll.bind(this)
        this.rename = this.rename.bind(this)
        this.remove = this.remove.bind(this)
    }

    add:RequestHandler = async (req, res, next) => {
        try{
            const { name, toLanguage, fromLanguage } = req.body;
            const createdList = await this.wordsListService.addService(name, toLanguage, fromLanguage);
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

    getAll:RequestHandler = async (req, res, next) => {
        try{
            const lists = await this.wordsListService.getAllListsService();
            return res.status(200).json({
                success: true,
                lists: lists
            })
        }catch(error){
            console.log(error)
        }
    }

    rename:RequestHandler = async (req, res, next) => {
        try{
            const { id, newName } = req.body;
            const renamedList = await this.wordsListService.renameListService(id, newName)
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
            const id = (req.body as { id:string } ).id;
            const removedList = await this.wordsListService.removeService(id);
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
}