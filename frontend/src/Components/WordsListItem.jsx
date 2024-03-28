import React from 'react';
import Grid from '@mui/material/Grid';
import { IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function WordsListItem(props) {
    return (
        <Grid container spacing={2} alignItems="center" sx={{ m:1, ml:5, pr: 3, pb:1, width: "90%" }} style={{ backgroundColor: 'cadetblue' }}>
            <Grid item xs={6}>
                <Typography>{props.name}</Typography>
            </Grid>
            <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography>{props.fromLanguage} | {props.toLanguage}</Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton>
                    <CloseIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}
