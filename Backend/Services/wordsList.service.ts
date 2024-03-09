import { error } from "console";
import { WordsListRepository } from "../Repository/wordsList.repository";
import { QuizQuestion } from "../DTO/quiz.entity";

export class WordsListService{
    
    constructor(private wordsListRepository: WordsListRepository){

    }

    showAllLists:Function = async() =>{
        try{
            const allLists = await this.wordsListRepository.showAllLists();
            return allLists;
        }catch(err){
            console.log(error)
            throw new Error("WL service getting lists error")
        }
    }

    add:Function = async(name: string, toLanguage: string, fromLanguage: string) =>{
        try{
            const addCandidate = await this.wordsListRepository.findByName(name);
            if (addCandidate) {
                throw new Error("!Duplicate name error!");
            }
            const id = String(new Date().getTime())
            const pairsCount = 0;
            const newWordsList = this.wordsListRepository.add(id, name, pairsCount, toLanguage, fromLanguage)
            return newWordsList;
        }catch(error){
            console.log(error)
            throw new Error("WL service creation error")
        }
    }

    rename:Function = async(id: string, newName: string) =>{
        try{
            const renameCandidate = await this.wordsListRepository.findById(id);
            if (!renameCandidate) {
                throw new Error("!Cannot find word list with such id!")
            }
            const newList = await this.wordsListRepository.updateName(id, newName)
            return {id: id, newName: newName}
        }catch(error){
            console.log(error)
        }    
    }

    remove:Function  = async(id: string) =>{
        try{
            const removeCandidate = await this.wordsListRepository.findById(id);
            if (!removeCandidate) {
                throw new Error("!Cannot find word list with such id!")
            }
            this.wordsListRepository.deleteById(id)
            return id;
        }catch(error){
            console.log(error)
            return new Error("Error while removing word list")
        }
    }

    createQuiz:Function = async(listId: string) => {
        try{
            const quizCandidate = await this.wordsListRepository.findById(listId)
            if(!quizCandidate){
                throw new Error("!Cannot find list with such id!")
            }
            const wordListPairs = await this.wordsListRepository.getWordPairsFromList(listId)
            if(wordListPairs.length < 4){
                throw new Error("!The list is too small to create a quiz!")
            }
            let quiz: QuizQuestion[] = [];
            for(let i = 0; i < wordListPairs.length; i++){
                quiz[i] = new QuizQuestion(0,"",["", "", "", ""], "")
            }
            
            let availableAnswersIds: string[] = []
            for(let i = 0; i < wordListPairs.length; i++){
                availableAnswersIds.push(wordListPairs[i].id)
            }

            for(let i = 0; i < wordListPairs.length; i++){
                let pickedQuestionIdIndex = Math.floor(Math.random() * (availableAnswersIds.length))

                for(let j = 0; j < wordListPairs.length; j++){
                    if(availableAnswersIds[pickedQuestionIdIndex] == wordListPairs[j].id){
                        quiz[i].questionNumber = i+1;
                        quiz[i].question = wordListPairs[j].fromWord
                        quiz[i].correctAnswer = wordListPairs[j].toWord
                    }
                }
                
                let pickedIds:string[] = []
                pickedIds.push(availableAnswersIds[pickedQuestionIdIndex])
                let correctAnswerNumber = Math.floor(Math.random() * 4)

                for(let j = 0; j < 4; j++){
                    if(j == correctAnswerNumber)
                        quiz[i].possibleAnswers[j] = quiz[i].correctAnswer
                    else{
                        let randomAnswerId = Math.floor(Math.random() * (wordListPairs.length))
                        while(pickedIds.indexOf(wordListPairs[randomAnswerId].id) != -1){
                            randomAnswerId = Math.floor(Math.random() * (wordListPairs.length))
                        }
                        pickedIds.push(wordListPairs[randomAnswerId].id)
                        quiz[i].possibleAnswers[j] = wordListPairs[randomAnswerId].toWord
                    }
                }
                availableAnswersIds.splice(pickedQuestionIdIndex, 1);
            }
            return quiz
        }catch(error){
            console.log(error)
            return new Error('Error while creating quiz')
        }
    }
}