export class QuizQuestion {
    questionNumber:number
    question:string
    possibleAnswers:string[]
    correctAnswer:string
    constructor(questionNumber:number=-1, question: string="", possibleAnswers:string[]=["", "", "", ""], correctAnswer:string=""){
        this.questionNumber = questionNumber
        this.question = question
        this.possibleAnswers = possibleAnswers
        this.correctAnswer = correctAnswer
    }
}