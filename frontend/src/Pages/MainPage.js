import { useEffect, useState } from "react"
import { Stack, Button } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import WordsListItem from '../Components/MainPage/WordsListItem';
import AddWordsListModal from "../Components/MainPage/AddWordsListModal";
import RenameWordsList from "../Components/MainPage/RenameWordsList";

function MainPage(props) {

  const [listsLoading, setListsLoading] = useState(false)

  const [wordsLists, setWordsLists] = useState([])
  const [showAddListWindow, setShowAddListWindow] = useState(false)
  const handleAddWindowClose = () => setShowAddListWindow(false);
  const [showRenameListWindow, setShowRenameListWindow] = useState(false)
  const handleRenameWindowClose = () => setShowRenameListWindow(false)
  const [curRenameListId, setCurRenameListId] = useState()
  const [curRenameListName, setCurRenameListName] = useState()

  useEffect(() => {
    getWordsLists()
  }, [])

  function getWordsLists() {
    setListsLoading(true)
    let link = `http://localhost:3000/wordsList/showWordsLists`
    fetch(link, {
      method: 'GET',
      mode: 'cors'
    }).then((response) => {
      console.log(response)
      return response.json()
    }).then(data => {
      if (!data.success) {
        throw new Error(data.message)
      }
      setWordsLists(data.lists)
      setListsLoading(false)
    }).catch((err) => {
      console.log(err)
    })

  }

  function deleteWordsList(wordsListId) {
    let link = "http://localhost:3000/wordsList/removeWordsList"
    fetch(link, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify({
        id: wordsListId,
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
      let buff = [...wordsLists]
      buff.forEach((list, index, buff) => {
        if (list.id === wordsListId) {
          buff.splice(index, 1);
        }
      })
      setWordsLists(buff)
    }).catch((err) => {
      console.log(err)
    })
  }

  function openAddListWindow() {
    if (!showAddListWindow)
      setShowAddListWindow(true)
    else
      setShowAddListWindow(false)
  }

  return (
    <div className="MainPage">
      {
        listsLoading ?
          <Stack alignItems="center" justifyContent="center" marginTop={3}>
            <CircularProgress color="neutral" size="md" />
          </Stack>
          :
          <Stack alignItems="center" justifyContent="center" marginTop={3}>
            {
              wordsLists.map(i => {
                return <WordsListItem key={i.id}
                  onClickChoose={() => { props.openListPage(); props.setCurWordsListInfo({ id: i.id, name: i.name, fromLanguage: i.fromLanguage, toLanguage: i.toLanguage }) }}
                  onClickDelete={() => deleteWordsList(i.id)}
                  onClickRename={() => { setCurRenameListId(i.id); setCurRenameListName(i.name); setShowRenameListWindow(true) }}
                  name={i.name}
                  fromLanguage={i.fromLanguage}
                  toLanguage={i.toLanguage} />
              })
            }
            <Button onClick={openAddListWindow} variant="contained" sx={{ mt: 4, width: "20%" }}>New list</Button>
            <AddWordsListModal getWordsLists={getWordsLists} showAddListWindow={showAddListWindow} handleClose={handleAddWindowClose} />
            <RenameWordsList getWordsLists={getWordsLists} curRenameListId={curRenameListId} curRenameListName={curRenameListName} showRenameListWindow={showRenameListWindow} handleClose={handleRenameWindowClose} />
          </Stack>
      }
    </div>
  );
}

export default MainPage;
