import styles from './WordRush.module.css';
import MainGame from '../../MainPage/MainGame';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {AiFillHeart} from 'react-icons/ai'
import {IoMdArrowRoundBack} from 'react-icons/io';
import CardAlpha from '../../CardAlpha'

const WordRush = props =>{
    const [lives,setLives] = useState(3);
    const [score,setScore] = useState(0);
    const [current,setCurrent]= useState(null);
    const [test,setTest]= useState(false);
    const wordList = useSelector(state=> state.data.wordList);
    const bg = useSelector(state=> state.theme.cardBg);


  
    const bgcolor = CardAlpha(bg,0.1);



    // sets a different word after each turn . 
    let holder = <p>GET READY ...</p>
    useEffect(()=>{
        let timer;
        setTimeout(() => {
            let chosenWord = wordList[Math.floor(Math.random()*wordList.length)];
            if (current){
                    while (chosenWord.word.localeCompare(current.word)===0){
                        chosenWord = wordList[Math.floor(Math.random()*wordList.length)];
                        }
            }
            if(lives>0){

            
            setCurrent(chosenWord);
            setTest(state=>!state);
            }
        }, 800);
          
    
            // also timer in here ?
             timer = setTimeout(() => {
               if(lives>0) setLives(prev=> prev -1);
                setCurrent(null)
            }, 5800);
    
        // cleanup for timer after every guess
        return ()=>{ clearTimeout(timer);}

    },[lives,score,wordList])

    const finishRound = result =>{
        if (!result){
            if (lives===1){
                // lost
                console.log('lost')
                return;
            } 
            setLives(prev => prev -1);
        }
        else {
            // won
            setScore(prev => prev+1);

        }
    }
    const backToList = () =>{
        props.closeGame(0);
    }
    const restartGame = ()=>{
        setLives(3);
        setScore(0);
    }


    return(
        <div style={{'backgroundColor':bgcolor}} className={styles.mainContainer}>
            <section className={styles.infoSection}>
            <section className={styles.backToSection} onClick={backToList}> <IoMdArrowRoundBack/>  <p>Back To Games</p></section>
              <section> <p>Lives :</p> {lives>0 && <AiFillHeart className={styles.heart}/>} {lives>1 && <AiFillHeart className={styles.heart}/>} {lives>2 && <AiFillHeart className={styles.heart}/>}  </section> 
                <p>Points : {score}</p>
            </section>
          { test &&  <div id='timeLeftDiv' className={`${styles.timeLeftDiv} `}></div>}
          { !test && <div id='timeLeftDiv' className={`${styles.timeLeftDiv} `}></div>}
          {!current && lives>1 && holder}
          {!current &&lives<=0 && <p style={{'cursor':'pointer'}} onClick={restartGame}>GAME OVER , SCORE : {score} , CLICK TO RETRY</p>}
    {current && <MainGame shortAnimation={true} finishRound={finishRound} chosen={current} done={false}/>}

        </div>
    )
}
export default WordRush;