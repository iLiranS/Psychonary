import './App.css';
import Menu from './components/menu/Menu';
import Main from './components/MainPage/Main';
import    { dataActions } from './store/data';
import {  useCallback, useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import Dictionary from './components/Dictionary/Dictionary';
import { themeActions } from './store/themeSlice';
import Settings from './components/Settings/Settings';
import GameList from './components/Games/GameList';
import LiveChat from './components/MainPage/LiveChat';
import {db } from './components/firebase'
import  firebase from 'firebase/compat/app'; 
import {  orderBy, query } from "firebase/firestore";  





function App() {
  const listIsOpen = useSelector(state=> state.theme.listOpen);
  const settingsOpen = useSelector(state=> state.theme.settingsOpen);
  const liveChatOpen = useSelector(state=>state.theme.liveChatOpen);
  const wordList = useSelector(state=> state.data.wordList);
  const bg = useSelector(state=> state.theme.bg);
  const textColor = useSelector(state=> state.theme.textColor);
  const [page,setPage] = useState('home');
  const dispatch = useDispatch();
  const auth = firebase.auth();
console.log('App.js Rendered !')

  // update bg whenever changes .
  useEffect(()=>{
    if(localStorage.getItem('theme')){
      const theme = JSON.parse(localStorage.getItem('theme'));
      document.body.style.backgroundImage = `url(${theme.bg})`;
    }
    else document.body.style.backgroundImage = `url(${bg})`;
  },[bg])

// get the database which poinitng to getting function
  const getDataBase = useCallback(async()=>{
    if (wordList.length<1){
      db.collection('list').orderBy('word','asc').onSnapshot((snapshot)=>{
        dispatch(dataActions.setList(snapshot.docs.map(doc => doc.data())));
    });
  }
  },[dispatch,wordList.length])

// first effect to set list 
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
