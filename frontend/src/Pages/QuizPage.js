import { useState, useEffect } from "react"
import { Stack } from "@mui/material"
import CircularProgress from '@mui/joy/CircularProgress';
import ResultTab from "../Components/QuizPage/ResultTab"
import QuizQuestion from "../Components/QuizPage/QuizQuestion"

function QuizPage(props) {

    const [quiz, setQuiz] = useState([])
    const [curQuestion, setCurQuestion] = useState(0)
    const [score, setScore] = useState(0)

    useEffect(() => {
        generateQuiz()
    }, [])

    function generateQuiz() {
        let link = `http://localhost:3000/wordsList/createQuizOneKnown/${props.curWordsListInfo.id}`
        fetch(link, {
            method: 'GET',
            mode: 'cors'
        }).then((response) => {
            return response.json()
        }).then(data => {
            if (!data.success) {
                throw new Error(data.message)
            }
            setQuiz(data.quiz)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <Stack alignItems="center" justifyContent="center"
            sx={{ minHeight: '70vh' }} marginTop={2} spacing={3}>
            {
                quiz.length !== 0 ?
                    curQuestion < quiz.length ?
                        <QuizQuestion
                            questionNumber={quiz[curQuestion].questionNumber}
                            question={quiz[curQuestion].question}
                            possibleAnswers={quiz[curQuestion].possibleAnswers}
                            correctAnswer={quiz[curQuestion].correctAnswer}
                            score={score}
                            setScore={setScore}
                            setCurQuestion={setCurQuestion}
                        /> :
                    <ResultTab resultScore={score} maxScore={quiz.length} openMainPage={props.openMainPage}/>
                    :
                    <CircularProgress/>
            }

        </Stack>
    )
}

export default QuizPage