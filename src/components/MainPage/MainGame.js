import {  useState , React, useEffect} from 'react';
import styles from './MainGame.module.css';
import { useSelector } from 'react-redux';
import {TiVolumeDown} from 'react-icons/ti';
import CardAlpha from '../CardAlpha';

const MainGame = props =>{
    const list = useSelector(state=>state.data.wordList);
    const bg = useSelector(state=> state.theme.cardBg);
const [hasClicked , setHasClicked] = useState(false);
const [chosenAnswer,setChosenAnswer] = useState(null);
const [mixOfAnswers,setMixOfAnswers] = useState([]);
const [chosenIndex,setChosenIndex]= useState();
let { chosen , shortAnimation} = props;


const bgcolor = CardAlpha(bg,0.1);


useEffect(()=>{
    let translatedList = list.map(item=>item.translate);
    setChosenAnswer(null);
    setHasClicked(false);

    let fornow =[];
    let already =[];
    for (let i =0 ; i<4 ; i++){
        let rnd = Math.floor(Math.random()*translatedList.length);
        while (fornow.includes(translatedList[rnd]) || translatedList[rnd].localeCompare(chosen.translate) ===0) {
            rnd = Math.floor(Math.random()*translatedList.length);
        }
        fornow[i] = translatedList[rnd];
        already[rnd]++;
    }
    let chosenIndex =Math.floor(Math.random()*4);
    fornow[chosenIndex] = chosen.translate;
    setChosenIndex(chosenIndex);
    setMixOfAnswers(fornow);
},[chosen,list])




    const checkAnswer = el =>{
        if (!hasClicked){
        setHasClicked(true);
       const answer = el.target.innerHTML;
       setChosenAnswer(answer);
       if (answer === chosen.translate){
        // won
        if(!shortAnimation)setTimeout(() => {
            props.finishRound(true);
        }, 2000);
        else{
                props.finishRound(true);
           
            
        }
       }
       else {
        // lost
        if(!shortAnimation)setTimeout(() => {
            props.finishRound(false);
        }, 2000);
        else{
           
                props.finishRound(false);
            
        }

       }
    }
    }
    let utter = new SpeechSynthesisUtterance();
    utter.volume = 0.35;
    const speechWord =()=>{
        utter.text = chosen.word;
        window.speechSynthesis.speak(utter);
    }

    return(
        <div  className={styles.mainContainer}>
    
   <div style={{'background':bgcolor}} className={styles.container}>
            {props.done ? <p>! עברת על כל המילים</p> : ''}
           <div className={styles.wordDiv}> <h2>{chosen.word}</h2> <TiVolumeDown className={styles.btn} onClick={speechWord}/> </div>
            <section>
                <ul>
                <li className={` ${shortAnimation && styles.short} ${chosenAnswer ===mixOfAnswers[0] ? styles.chosen : ''} ${chosenIndex === 0 ? styles.correct : styles.wrong} ${hasClicked && styles.active}`} onClick={checkAnswer}>{mixOfAnswers[0]}</li>
                <li className={` ${shortAnimation && styles.short} ${chosenAnswer ===mixOfAnswers[1] ? styles.chosen : ''} ${chosenIndex === 1 ? styles.correct : styles.wrong} ${hasClicked && styles.active}`} onClick={checkAnswer}>{mixOfAnswers[1]}</li>
                <li className={` ${shortAnimation && styles.short} ${chosenAnswer ===mixOfAnswers[2] ? styles.chosen : ''} ${chosenIndex === 2 ? styles.correct : styles.wrong} ${hasClicked && styles.active}`} onClick={checkAnswer}>{mixOfAnswers[2]}</li>
                <li className={` ${shortAnimation && styles.short} ${chosenAnswer ===mixOfAnswers[3] ? styles.chosen : ''} ${chosenIndex === 3 ? styles.correct : styles.wrong} ${hasClicked && styles.active}`} onClick={checkAnswer}>{mixOfAnswers[3]}</li>
                </ul>
            </section>
        </div>
        </div>
     
    )
}
export default MainGame;