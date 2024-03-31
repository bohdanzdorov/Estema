import { Button, Stack, Typography } from "@mui/material";

export default function ResultTab(props) {
    return (
        <Stack width={"100%"} alignItems="center" justifyContent="center">
            <Typography variant="h4">Nice job!</Typography>
            <Typography variant="h4">Your score is</Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{props.resultScore} / {props.maxScore}</Typography>
            <Button onClick={props.openMainPage}>Main menu</Button>
        </Stack>
    )
}