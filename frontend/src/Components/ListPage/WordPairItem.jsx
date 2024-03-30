import React from 'react';
import { Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function WordPairItem(props){
    
    return (
        <Grid container spacing={2} alignItems="center" sx={{ m: 1, pr: 3, pb: 1, width: "50%" }} style={{ backgroundColor: 'aquamarine' }}>
        <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Typography>{props.fromWord}</Typography>
        </Grid>
        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Typography>|</Typography>
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Typography>{props.toWord}</Typography>
        </Grid>
        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={props.onClickDelete}>
                <CloseIcon />
            </IconButton>
        </Grid>
    </Grid>
    )
}