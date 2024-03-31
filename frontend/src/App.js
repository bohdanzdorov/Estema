import { useState } from 'react';
import MainPage from './Pages/MainPage';
import Navbar from './Components/Navbar';
import ListPage from './Pages/ListPage';
import QuizPage from './Pages/QuizPage';

function App() {
  const [curPage, setCurPage] = useState(0) //0 - Main, 1 - List, 2 - Quiz  
  const [curWordsListInfo, setCurWordsListInfo] = useState("")
  const [quizType, setQuizType] = useState(0)

  return (
    <div className="App">
      <Navbar openMainPage={() => setCurPage(0)} />
      {
        curPage === 0 ?
          <MainPage setCurWordsListInfo={setCurWordsListInfo} openListPage={() => setCurPage(1)} /> :
          curPage === 1 ?
            <ListPage curWordsListInfo={curWordsListInfo} questionUnknownType={() => { setQuizType(1); setCurPage(2) }} questionKnownType={() => { setQuizType(2); setCurPage(2) }} questionMixedType={() => { setQuizType(3); setCurPage(2) }} /> :
            <QuizPage curWordsListInfo={curWordsListInfo} quizType={quizType} openMainPage={() => setCurPage(0)} />
      }
    </div>
  );
}

export default App;
