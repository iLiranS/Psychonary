import { useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import styles from './Main.module.css';
import MainGame from './MainGame';
import { dataActions } from '../../store/data';



const Main = props =>{
    const dispatch = useDispatch();
    const [focusedList,setFocusedList] = useState([]);
    const [focusTurn,setFocusTurn] = useState(true);
    const [currentWord,setCurrentWord] = useState(null);
    const leftList = useSelector(state=>state.data.leftList);
    const wordList = useSelector(state=>state.data.wordList);
    const isDone = leftList.length < 1;
    useEffect(()=>{
        // this effect creates focused list .
        let focusedlistForNow = [];
        // check if focusedList already exists
        if (localStorage.getItem('focusedList')){
            focusedlistForNow=(JSON.parse(localStorage.getItem('focusedList')));
            setFocusedList(focusedlistForNow);
        }
        // generate new focusedList , when focused is 0 or below 5 .
         if(leftList.length>0){ 
            let fornow = [...focusedlistForNow];
            let fornowWords = [...fornow].map(item=>item.word);
            if (leftList.length > 5){
                while (fornow.length<5){
                    let rnd = Math.floor(Math.random()*leftList.length);
                    if (!fornowWords.includes(leftList[rnd].word)){
                        fornow.push(leftList[rnd]);
                        fornowWords.push(leftList[rnd].word);
                    }
                    
                }
            }
            else {
                while (fornow.length<leftList.length){
                    let rnd = Math.floor(Math.random()*leftList.length);
                    if (!fornowWords.includes(leftList[rnd].word)){
                        fornow.push(leftList[rnd]);
                        fornowWords.push(leftList[rnd].word);
                    }
                }
            }
          
            setFocusedList(fornow);
            localStorage.setItem('focusedList',JSON.stringify(fornow));
        }
        else{
            console.log('cant focus 0 words :p');
        }

    },[leftList])


    const getRandomWord = () =>{
        let rnd;
        rnd = Math.floor(Math.random()*2);
        if (focusedList.length>0 && currentWord){
            // problem : last turn wasnt focus and it was focus word and now its focus and rnd 1 ...
            // solution : dont choose FOCUS WORD IF FOCUS LIST IS EQUAL TO 1 !!!!!!!!
            if (focusTurn && rnd===1){
              rnd=  Math.floor(Math.random()*focusedList.length);
              while (focusedList[rnd].word.localeCompare(currentWord.word)===0){
                rnd=  Math.floor(Math.random()*focusedList.length);
              }
              setCurrentWord(focusedList[rnd]);
            }
            else{
                if(leftList.length <3){
                    rnd= Math.floor(Math.random()*wordList.length);
                    while (wordList[rnd].word.localeCompare(currentWord.word)===0|| wordList[rnd].word.localeCompare(focusedList[0].word)===0 ){
                     rnd= Math.floor(Math.random()*wordList.length);
                    }
                    setCurrentWord(wordList[rnd]);
                }

                else {
                  rnd= Math.floor(Math.random()*leftList.length);
                  while (leftList[rnd].word.localeCompare(currentWord.word)===0|| leftList[rnd].word.localeCompare(focusedList[0].word)===0){
                  rnd= Math.floor(Math.random()*leftList.length);
               }
               setCurrentWord(leftList[rnd]);
            }
               
            }
    }
    else{     
        
        if  (leftList.length >1){
            rnd = Math.floor(Math.random()*leftList.length);
            setCurrentWord(leftList[rnd]);   
            }
        
          else {
              rnd = Math.floor(Math.random()*wordList.length);
            if (currentWord){
            while (wordList[rnd].word.localeCompare(currentWord.word)===0 ){
                rnd= Math.floor(Math.random()*wordList.length);
               }
            }
    setCurrentWord(wordList[rnd]);    
        }
    }

    }
//&& wordList[rnd].word.localeCompare(focusedList[0].word)===0
    useEffect(()=>{
         getRandomWord();
        
     },[focusTurn,focusedList])


    const finishRound = result =>{
        if (result === true){
            //won
            dispatch(dataActions.learnWord(currentWord))
           const fornow = [...focusedList];
           const fornowWords = [...fornow].map(item=>item.word);
           if(fornowWords.includes(currentWord.word)){
            fornow.splice(fornowWords.indexOf(currentWord.word),1);
            setFocusedList(fornow);
            if (fornow.length ===0) localStorage.removeItem('focusedList');
            else localStorage.setItem('focusedList',JSON.stringify(fornow));
           }
            setFocusTurn(prev => !prev);
        }
        else{
            // lost
            setFocusTurn(prev => !prev)
        }
    }

// const wordRef = useRef();
// const tranRef = useRef();
// const addword = event =>{
//     event.preventDefault();
//     const wordObj = {word : wordRef.current.value.toLowerCase() , translate: tranRef.current.value};
//     props.addWord(wordObj);
// }
    return(
        <div className={styles.mainContainer}>
            {/* <section> 
                <form onSubmit={addword}>
                     <input type='text' ref={wordRef} placeholder='מילה'></input>
                     <input type='text' ref={tranRef} placeholder='תרגום'></input>
                    <button>הוסף מילה</button>
                </form>
                </section> */}
           {currentWord && wordList.length>3 ? <MainGame finishRound={finishRound} chosen={currentWord} done={isDone}/> : <section>Oh oh , something went wrong 😵  </section>}
           
        </div>
    )
}

export default Main;