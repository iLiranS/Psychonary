import './App.css';
import Menu from './components/menu/Menu';
import Main from './components/MainPage/Main';
import   { dataActions } from './store/data';
import {  useCallback, useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import Dictionary from './components/Dictionary/Dictionary';
import { themeActions } from './store/themeSlice';
import Settings from './components/Settings/Settings';
import GameList from './components/Games/GameList';
import LiveChat from './components/MainPage/LiveChat';
import {db } from './components/firebase'




function App() {
  const listIsOpen = useSelector(state=> state.theme.listOpen);
  const settingsOpen = useSelector(state=> state.theme.settingsOpen);
  const liveChatOpen = useSelector(state=>state.theme.liveChatOpen);
  const wordList = useSelector(state=> state.data.wordList);
  const bg = useSelector(state=> state.theme.bg);
  const textColor = useSelector(state=> state.theme.textColor);
  const [page,setPage] = useState('home');
  const [fireBaseApp,setFireBaseApp] = useState(null);
  const dispatch = useDispatch();
  const [canAttempt,setCanAttempt] = useState(true);
  



  // update bg whenever changes .
  useEffect(()=>{
    if(localStorage.getItem('theme')){
      const theme = JSON.parse(localStorage.getItem('theme'));
      document.body.style.backgroundImage = `url(${theme.bg})`;
    }
    else document.body.style.backgroundImage = `url(${bg})`;
  },[bg])
  useEffect(()=>{
   setTimeout(() => {
    setCanAttempt(true);
   }, 2000); 
  },[canAttempt])

  const getDataBase = useCallback(async()=>{
    if (canAttempt && wordList.length<1){
      setCanAttempt(false);
    
    try{
    const response = await fetch(`${process.env.REACT_APP_API_KEY}`);
    if (!response.ok) throw new Error('couldnt get database');
      const data = await response.json();
      dispatch(dataActions.setList(data));

    }
    catch(err){
      console.log('something went wrong ' + err.message)
    }
  }
  },[dispatch,canAttempt])

//first effect used to load data from firebase and set data wordList to firebase's one.
 useEffect(()=>{
  getDataBase();



 },[getDataBase])

 const changePage = page =>{
  dispatch(themeActions.disableAll());
  setPage(page);
 }


 

  return (
    <div style={{'color':textColor}} >
      
      <Menu changePage={changePage} />
     {page==='home' && wordList.length>0 && <Main/>}
     {wordList.length ===0 && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
     {page ==='games' && wordList.length>1 && <GameList/>}
     {listIsOpen && <Dictionary/>}
     {settingsOpen && <Settings/>}
     {liveChatOpen && db  &&<LiveChat/>}
    </div>
  );
}

export default App;
