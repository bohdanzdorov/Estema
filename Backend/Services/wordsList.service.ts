import { error } from "console";
import { WordsListRepository } from "../Repository/wordsList.repository";
import { QuizQuestion } from "../DTO/quiz.entity";
import { AddWordsListDTO } from "../DTO/addWordsListDTO";
import { DatabaseException } from "../Exceptions/DatabaseException";
import { ApiException } from "../Exceptions/ApiException";

export class WordsListService{
    
    constructor(private wordsListRepository: WordsListRepository){}

    showAllLists:Function = async() =>{
        try{
            const allLists = await this.wordsListRepository.showAllLists();
            return allLists;
        }catch(err){
            if(error instanceof DatabaseException){
                throw new DatabaseException(error.message)
            }
        }
    }

    add:Function = async(name: string, toLanguage: string, fromLanguage: string) =>{
        try{
            const addCandidate = await this.wordsListRepository.findByName(name);
            if (addCandidate) {
                throw new ApiException("Word list with such name already exist", 400);
            }
            const id = String(new Date().getTime())
            const pairsCount = 0;
            const addWordsListDTO = new AddWordsListDTO(id, name, pairsCount, toLanguage, fromLanguage)
            const newWordsList = this.wordsListRepository.add(addWordsListDTO)
            return newWordsList;
        }catch(error){
            if(error instanceof DatabaseException){
                throw new DatabaseException(error.message)
            }else if(error instanceof ApiException){
                throw new ApiException(error.message, error.statusCode)
            }
        }
    }

    rename:Function = async(id: string, newName: string) =>{
        try{
            const renameCandidate = await this.wordsListRepository.findById(id);
            if (!renameCandidate) {
                throw new ApiException("Word list with such id does not exist", 400)
            }
            const newList = await this.wordsListRepository.updateName(id, newName)
            //TODO: check this return statement
            console.log("Rename words lists", newList)
            return {id: id, newName: newName}
        }catch(error){
            if(error instanceof DatabaseException){
                throw new DatabaseException(error.message)
            }else if(error instanceof ApiException){
                throw new ApiException(error.message, error.statusCode)
            }
        }    
    }

    remove:Function = async(id: string) =>{
        try{
            const removeCandidate = await this.wordsListRepository.findById(id);
            if (!removeCandidate) {
                throw new ApiException("Word list with such id does not exist", 400)
            }
            this.wordsListRepository.deleteById(id)
            return id;
        }catch(error){
            if(error instanceof DatabaseException){
                throw new DatabaseException(error.message)
            }else if(error instanceof ApiException){
                throw new ApiException(error.message, error.statusCode)
            }
        }
    }

    createQuiz:Function = async(listId: string) => {
        try{
            const quizCandidate = await this.wordsListRepository.findById(listId)
            if(!quizCandidate){
                throw new ApiException("List with such id does not exist", 400)
            }
            const wordListPairs = await this.wordsListRepository.findWordPairsFromList(listId)
            if(wordListPairs.length < 4){
                throw new ApiException("The list is too small to create a quiz", 400)
            }
            //creating empty questions array
            let quiz: QuizQuestion[] = [];
            for(let i = 0; i < wordListPairs.length; i++){
                quiz[i] = new QuizQuestion()
            }
            //creating array to track questions, that are already in the quiz
            let availableAnswersIds: string[] = []
            for(let i = 0; i < wordListPairs.length; i++){
                availableAnswersIds.push(wordListPairs[i].id)
            }
            //filling the quiz array
            for(let i = 0; i < wordListPairs.length; i++){
                //picking random wordPair from available
                let pickedQuestionIdIndex = Math.floor(Math.random() * (availableAnswersIds.length))
                for(let j = 0; j < wordListPairs.length; j++){
                    if(availableAnswersIds[pickedQuestionIdIndex] == wordListPairs[j].id){
                        quiz[i].questionNumber = i+1;
                        quiz[i].question = wordListPairs[j].fromWord
                        quiz[i].correctAnswer = wordListPairs[j].toWord
                    }
                }
                //creating array to track ids of picked 4 possible answers(3 incorrect and 1 correct)
                let pickedIds:string[] = []
                pickedIds.push(availableAnswersIds[pickedQuestionIdIndex])
                //randomly chosing a place for correct answer
                let correctAnswerNumber = Math.floor(Math.random() * 4)
                //randomly choosing 3 incorrect answers
                for(let j = 0; j < 4; j++){
                    //put in correct answer
                    if(j == correctAnswerNumber)
                        quiz[i].possibleAnswers[j] = quiz[i].correctAnswer
                    //put in incorrect answer
                    else{
                        let randomAnswerId = Math.floor(Math.random() * (wordListPairs.length))
                        //check if id is not already picked into possible answers
                        while(pickedIds.indexOf(wordListPairs[randomAnswerId].id) != -1){
                            randomAnswerId = Math.floor(Math.random() * (wordListPairs.length))
                        }
                        pickedIds.push(wordListPairs[randomAnswerId].id)
                        quiz[i].possibleAnswers[j] = wordListPairs[randomAnswerId].toWord
                    }
                }
                //question is not longer able to pick (so that every question is unique)
                availableAnswersIds.splice(pickedQuestionIdIndex, 1);
            }
            return quiz
        }catch(error){
            if(error instanceof DatabaseException){
                throw new DatabaseException(error.message)
            }else if(error instanceof ApiException){
                throw new ApiException(error.message, error.statusCode)
            }
        }
    }
}