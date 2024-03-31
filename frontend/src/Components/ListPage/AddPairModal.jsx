import { useState } from "react"
import { Stack, Button, TextField, Box, Modal } from "@mui/material"
import { addWindowStyle } from "../styles/addWindowStyle";

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
      if (!data.success) {
        throw new Error(data.message)
      }
      setTargetWord(data.wordPair.toWord)
    }).catch((err) => {
      console.log(err)
    })
  }

  function addPair() {
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
      if (!data.success) {
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
      <Stack sx={addWindowStyle} spacing={3}>
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