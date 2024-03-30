import { useState } from "react"
import {Stack, Button, TextField, MenuItem, Box, Modal} from '@mui/material';

const addListWindowStyle = {
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

const sourceLanguages = [
    {
        value: 'en',
        label: 'English',
    },
    {
        value: 'uk',
        label: 'Ukrainian',
    },
    {
        value: 'es',
        label: 'Spanish',
    }
];
const targetLanguages = [
    {
        value: 'en-GB',
        label: 'English',
    },
    {
        value: 'uk',
        label: 'Ukrainian',
    },
    {
        value: 'es',
        label: 'Spanish',
    }
];

export default function AddWordsListModal(props) {
    const [addListName, setAddListName] = useState("")
    const [addListSourceLang, setAddListSourceLang] = useState("")
    const [addListTargetLang, setAddListTargetLang] = useState("")

    function addWordsList() {
        let link = "http://localhost:3000/wordsList/addWordsList"
    
        fetch(link, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            name: addListName,
            toLanguage: addListTargetLang,
            fromLanguage: addListSourceLang
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
          setAddListName("")
          setAddListSourceLang("")
          setAddListTargetLang("")
          props.getWordsLists()//Could be implemented without additional fetching
          props.handleClose()
        }).catch((err) => {
          console.log(err)
        })
      }

    return (
        <Modal
            open={props.showAddListWindow}
            onClose={props.handleClose}
        >
            <Stack sx={addListWindowStyle} spacing={3}>
                <TextField
                    value={addListName}
                    onChange={(e) => {
                        setAddListName(e.target.value)
                    }}
                    id="outlined-basic" label="List name" variant="outlined" />

                <TextField
                    value={addListSourceLang}
                    onChange={(e) => {
                        setAddListSourceLang(e.target.value)
                    }}
                    id="select-source-language"
                    select
                    defaultValue="en-GB"
                    label="Source language"
                >
                    {sourceLanguages.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    value={addListTargetLang}
                    onChange={(e) => {
                        setAddListTargetLang(e.target.value)
                    }}
                    id="select-target-language"
                    select
                    defaultValue="en-GB"
                    label="Target language"
                >
                    {targetLanguages.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={addWordsList} variant="contained" sx={{ mt: 1, width: "20%" }}>Add</Button>
                </Box>
            </Stack>
        </Modal>
    )
}