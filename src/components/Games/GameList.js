import styles from './GameList.module.css';
import image from '../images/wordrushimage2.png';
import image2 from '../images/snake.jpeg';
import image3 from '../images/wordle.jpeg';
import faqimage from '../images/faqimage.jpeg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import WordRush from './WordRush/WordRush';
import Snake from './Snake/Snake';
import Wordle from './Wordle/Wordle';
import Faq from './FAQ/Faq';
import CardAlpha from '../CardAlpha';


const GameList = props =>{
    const [currentGame,setCurrentGame] = useState(0); // 0 nothing , 1 wordh rush , 2 draw the line , 4 faq
    const cardBg = useSelector(state=> state.theme.cardBg);
    const bg = CardAlpha(cardBg,0.2);
    const setGame = num =>{
        setCurrentGame(num);
    }



    return(
        <div style={{'background':bg}} className={styles.mainContainer}>
            {currentGame === 0 &&
            <ul className={styles.listUL}>
                <h3>WORD GAMES</h3>
                <li onClick={()=>{setGame(1)}}>
                    <div>
                        <h2>Word Rush</h2>
                        <p>Guess as many words as you can while having 3 life points and limited time for each word to guess.</p>
                    </div>
                    <img src={image} alt='word rush'></img>
                </li>


                <li onClick={()=>{setGame(2)}}  >
                    <div>
                        <h2>Snake</h2>
                        <p>The popular snake game with a nice twist</p>
                    </div>
                    <img src={image2} alt='word draw line'></img>
                </li>
                

                <li onClick={()=>{setGame(3)}}>
                    <div>
                        <h2>Wordle</h2>
                        <p>Based on NYTimes popular game , guess the correct word guided by previous mistakes hints.</p>
                    </div>
                    <img src={image3} alt='word search'></img>
                </li>

                <li onClick={()=>{setGame(4)}}>
                    <div>
                        <h2>FAQ</h2>
                        <p>Watch the purpose of the site , systems behind it and how it works :)</p>
                    </div>
                    <img src={faqimage} alt='faq'></img>
                </li>

            </ul>
            }
            { currentGame ===1 && <WordRush closeGame={setGame}/>}
            { currentGame ===2 && <Snake closeGame={setGame}/>}
            { currentGame ===3 && <Wordle closeGame={setGame}/>}
            {currentGame ===4 && <Faq closeGame={setGame}/>}

        </div>
    )
}
export default GameList;