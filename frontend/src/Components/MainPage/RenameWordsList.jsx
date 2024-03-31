import { useState } from "react"
import { Stack, Button, TextField, Modal } from '@mui/material';
import { addWindowStyle } from "../styles/addWindowStyle";

export default function RenameWordsList(props) {
  
  const [newName, setNewName] = useState("")

  function renameWordsList() {
    let link = `${process.env.REACT_APP_API_URL}/wordsList/renameWordsList`
    fetch(link, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        id: props.curRenameListId,
        newName: newName,
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
      setNewName("")
      props.getWordsLists()//Could be implemented without additional fetching
      props.handleClose()
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <Modal
      open={props.showRenameListWindow}
      onClose={props.handleClose}>
      <Stack sx={addWindowStyle} spacing={3}>
        <TextField
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value)
          }}
          id="outlined-basic" label="New list name" variant="outlined" />
        <Button onClick={renameWordsList} variant="contained" sx={{ mt: 1, width: "20%" }}>Rename</Button>
      </Stack>
    </Modal>
  )
}