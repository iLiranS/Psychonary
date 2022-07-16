import './App.css';
import Menu from './components/menu/Menu';
import Main from './components/MainPage/Main';
import  data, { dataActions } from './store/data';
import {  useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import Dictionary from './components/Dictionary/Dictionary';
import { themeActions } from './store/themeSlice';
import Settings from './components/Settings/Settings';
import GameList from './components/Games/GameList';
import LiveChat from './components/MainPage/LiveChat';
import axios from 'axios';
import {db } from './components/firebase'
import Faq from './components/Games/FAQ/Faq';





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
  



  // update bg whenever changes .
  useEffect(()=>{
    if(localStorage.getItem('theme')){
      const theme = JSON.parse(localStorage.getItem('theme'));
      document.body.style.backgroundImage = `url(${theme.bg})`;
    }
    else document.body.style.backgroundImage = `url(${bg})`;
  },[bg])

//first effect used to load data from firebase and set data wordList to firebase's one.
 useEffect(()=>{
  const options ={
    method:'GET',
    url:process.env.REACT_APP_WORDS_API_KEY,
    headers:{}
}
axios.request(options).then((response)=>{
  dispatch(dataActions.setList(response.data))
}).catch((error)=>{
    console.log(error);
})



 },[dispatch])

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
