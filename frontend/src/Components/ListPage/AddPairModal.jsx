import { Stack } from "@mui/material"
import { useState } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const addPairWindowStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddPairModal(props) {
    const [sourceWord, setSourceWord] = useState("")
    const [targetWord, setTargetWord] = useState("")

    function translateSourceWord() {
        let link = "http://localhost:3000/wordPair/translateWord"
        fetch(link, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            toLanguage: props.toLanguage,
            fromLanguage: props.fromLanguage,
            wordToTranslate: sourceWord
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          return response.json()
        }).then(data => {
          if(!data.success){
            throw new Error(data.message)
          }
          setTargetWord(data.wordPair.toWord)
        }).catch((err) => {
          console.log(err)
        })
    }

    function addPair(){
        let link = "http://localhost:3000/wordPair/addWordPair"
        fetch(link, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            fromWord: sourceWord,
            toWord: targetWord,
            wordsListId: props.wordsListId
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          return response.json()
        }).then(data => {
          if(!data.success){
            throw new Error(data.message)
          }
          setSourceWord("")
          setTargetWord("")
          props.getWordPairs()//Could be implemented without additional fetching
          props.handleClose()
        }).catch((err) => {
          console.log(err)
        })
    }

    return (
        <Modal
            open={props.showAddPairWindow}
            onClose={props.handleClose}
        >
            <Stack sx={addPairWindowStyle} spacing={3}>
                <TextField
                    value={sourceWord}
                    onChange={(e) => {
                        setSourceWord(e.target.value)
                    }}
                    id="outlined-basic" label="Word" variant="outlined" />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={translateSourceWord} variant="contained" sx={{ mt: 1, width: "25%" }}>Translate</Button>
                </Box>
                <TextField
                    value={targetWord}
                    onChange={(e) => {
                        setTargetWord(e.target.value)
                    }}
                    id="outlined-basic" label="Translation" variant="outlined" />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={addPair} variant="contained" sx={{ mt: 1, width: "20%" }}>Add</Button>
                </Box>
            </Stack>
        </Modal>
    )
}