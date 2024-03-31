import React from 'react';
import { IconButton, Typography, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export default function WordsListItem(props) {
    return (
        <Grid container spacing={2} alignItems="center" sx={{ m: 1, ml: 5, pr: 3, pb: 1, width: "90%" }} style={{ backgroundColor: 'aquamarine' }}>
            <Grid item xs={6} onClick={props.onClickChoose}>
                <Typography>{props.name}</Typography>
            </Grid>
            <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography>{props.fromLanguage} | {props.toLanguage}</Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton onClick={props.onClickRename} >
                    <DriveFileRenameOutlineIcon />
                </IconButton>
                <IconButton onClick={props.onClickDelete}>
                    <CloseIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}
