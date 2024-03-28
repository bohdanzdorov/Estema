import * as React from 'react';
import Navbar from '../Components/Navbar';
import Stack from '@mui/material/Stack';
import WordsListItem from '../Components/WordsListItem';


function MainPage() {
  return (
    <div className="MainPage">
      <Navbar/>
      <Stack>
        <WordsListItem name={"newList"} fromLanguage={"ENG"} toLanguage={"UKR"}/>
      </Stack>
    </div>
  );
}

export default MainPage;
