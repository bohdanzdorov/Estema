import { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

export default function QuizQuestion(props) {
    const [value, setValue] = useState("")
    const [resultColor, setResultColor] = useState("")

    function checkAnswer() {
        if (props.correctAnswer !== value) {
            setResultColor("error")
        } else {
            setResultColor("success")
            props.setScore(props.score+1)
        }
    }

    return (
        <Stack width={"100%"} alignItems="center" justifyContent="center">
            <Typography variant='h4' marginBottom={1}> Question {props.questionNumber}. Translate the word:</Typography>
            <Typography variant='h4' marginBottom={5} sx={{ fontWeight: 'bold' }}>{props.question}</Typography>
            <Stack
                direction={"row"}
                spacing={1}
                width={"100%"}
                alignItems="center"
                justifyContent="center" >
                {
                    props.possibleAnswers.map(i => {
                        return <Button
                            key={i}
                            onClick={() => setValue(i)}
                            color={resultColor !== "" ? resultColor : 'primary'}
                            variant={value === i ? "contained" : "outlined"}
                            sx={{ p: 8, width: "20%" }}>
                            {i}
                        </Button>
                    })
                }
            </Stack>
            <Stack direction={"row"} spacing={1} marginTop={2}>
                <Button disabled={resultColor !== ""} onClick={checkAnswer} variant='contained' sx={{ mt: 5, w:"15%" }}>Check</Button>
                <Button disabled={resultColor === ""} onClick={() => {setValue(""); setResultColor(""); props.setCurQuestion(props.questionNumber);}} variant='contained' sx={{ mt: 5, w:"15%" }}>{resultColor === "" ? "Skip" : "Next"}</Button>
            </Stack>
        </Stack>
    )
}