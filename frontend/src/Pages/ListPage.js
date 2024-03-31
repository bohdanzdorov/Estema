import { useEffect, useState } from "react"
import { Stack, Button, Typography } from "@mui/material"
import CircularProgress from '@mui/joy/CircularProgress';
import WordPairItem from "../Components/ListPage/WordPairItem"
import AddPairModal from "../Components/ListPage/AddPairModal"

function ListPage(props) {

    const [loadingPairs, setLoadingPairs] = useState(false)
    const [wordPairs, setWordPairs] = useState([])
    const [showAddPairWindow, setShowAddPairWindow] = useState(false)
    const handleAddWindowClose = () => setShowAddPairWindow(false);

    useEffect(() => {
        getWordPairs()
    }, [])

    function getWordPairs() {
        setLoadingPairs(true)
        let link = `http://localhost:3000/wordPair/showWordPairsByListId/${props.curWordsListInfo.id}`
        fetch(link, {
            method: 'GET',
            mode: 'cors'
        }).then((response) => {
            return response.json()
        }).then(data => {
            if (!data.success) {
                throw new Error(data.message)
            }
            setWordPairs(data.resultList)
            setLoadingPairs(false)
        }).catch((err) => {
            console.log(err)
        })
    }
    function deleteWordPair(pairId) {
        console.log("Deleting")
        let link = "http://localhost:3000/wordPair/removeWordPair"
        fetch(link, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify({
                pairId: pairId,
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
            let buff = [...wordPairs]
            buff.forEach((pair, index, buff) => {
                if (pair.id === pairId) {
                    buff.splice(index, 1);
                }
            })
            setWordPairs(buff)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        loadingPairs ?
            <Stack alignItems="center" justifyContent="center" marginTop={3}>
                <CircularProgress color="neutral" size="md" />
            </Stack>
            :
            <Stack alignItems="center" justifyContent="center" marginTop={3}>
                <Typography variant="h3" margin={1}>{props.curWordsListInfo.name}</Typography>
                {
                    wordPairs.map(i => {
                        return <WordPairItem key={i.id}
                            fromWord={i.fromWord}
                            toWord={i.toWord}
                            onClickDelete={() => deleteWordPair(i.id)} />
                    })
                }
                <Button onClick={() => setShowAddPairWindow(true)} variant="contained" sx={{ mt: 4, width: "20%" }}>New pair</Button>
                <AddPairModal
                    getWordPairs={getWordPairs}
                    handleClose={handleAddWindowClose}
                    toLanguage={props.curWordsListInfo.toLanguage}
                    fromLanguage={props.curWordsListInfo.fromLanguage}
                    wordsListId={props.curWordsListInfo.id}
                    showAddPairWindow={showAddPairWindow} />
                <Button onClick={props.questionMixedType} variant="contained" sx={{ mt: 4, width: "20%" }}>Start general quiz</Button>
                <Button onClick={props.questionKnownType} variant="contained" sx={{ mt: 2, width: "20%" }}>Start quiz<br /> (question is a familiar word)</Button>
                <Button onClick={props.questionUnknownType} variant="contained" sx={{ mt: 2, width: "20%" }}>Start quiz<br /> (question is a foreign word)</Button>
            </Stack>
    )
}

export default ListPage