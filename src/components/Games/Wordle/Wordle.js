import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Wordle.module.css';
import {IoMdArrowRoundBack} from 'react-icons/io'
import { useSelector } from 'react-redux';
import {FiDelete} from 'react-icons/fi'

const Wordle = props =>{
const [word1,setWord1] = useState(''); 
const [word2,setWord2] = useState(''); 
const [word3,setWord3] = useState(''); 
const [word4,setWord4] = useState(''); 
const [word5,setWord5] = useState('');
const [word6,setWord6] = useState(''); 
const [letters,setLetters] = useState(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'])
const [foundLetters,setFoundLetters] = useState([]);
const [wrongLetters,setWrongLetters] = useState([]);
const [existsLetters,setExistsLetters] = useState([]);
const [currentWord,setCurrentWord] = useState(1);
const [randomWord,setRandomWord] = useState('');
const [showAlert,setShowAlert] = useState(false);
const [result,setResult] = useState(null);
let word = randomWord.word;
const wordList = useSelector(state => state.data.wordList);
const wordOnlyList = useMemo(()=>wordList.map(item=>item.word),[wordList]);
const addLetter = useCallback((letter)=>{
    switch(currentWord){
        case 1:
            if (word1.length <5) setWord1(prev=> prev+letter);
        break;

        case 2:
            if (word2.length <5) setWord2(prev=> prev+letter);
        break;

        case 3:
            if (word3.length <5) setWord3(prev=> prev+letter);
        break;

        case 4:
            if (word4.length <5) setWord4(prev=> prev+letter);
        break;

        case 5:
            if (word5.length <5) setWord5(prev=> prev+letter);
        break;
        

        default:
                if (word6.length <5) setWord6(prev=> prev+letter);
            break;




    }
},[currentWord,word1,word2,word3,word4,word5,word6]);

const checkIfWon = num =>{
    switch(num){
        case 1:
            if(randomWord.word.localeCompare(word1)===0) { setResult(true) }
            break;
            case 2:
                if(randomWord.word.localeCompare(word2)===0) { setResult(true);}
                break;
                case 3:
                    if(randomWord.word.localeCompare(word3)===0) { setResult(true);}

                    break;
                    case 4:
                        if(randomWord.word.localeCompare(word4)===0) { setResult(true);}

                        break;
                        case 5:
                            if(randomWord.word.localeCompare(word5)===0) {setResult(true);}

                            break;
                            default:
                                if(randomWord.word.localeCompare(word6)===0) {  setResult(true);}
                                else setResult(false);
                                break;
    }
}

const updateArrays = (enteredWord) =>{
    let fornowRemain = [...letters];
    let fornowExists = [...existsLetters];
    let fornowCorrect = [...foundLetters];
    let fornowWrong = [...wrongLetters];
    for (let i = 0 ; i <enteredWord.length;i++){
        if (word.includes(enteredWord.charAt(i))&&!fornowExists.includes(enteredWord.charAt(i))) fornowExists.push(enteredWord.charAt(i));
        if (word.charAt(i) === enteredWord.charAt(i) &&!fornowCorrect.includes(enteredWord.charAt(i))) fornowCorrect.push(enteredWord.charAt(i))
        if (!word.includes(enteredWord.charAt(i))) fornowWrong.push(enteredWord.charAt(i));
    }
    setExistsLetters(fornowExists);
    setFoundLetters(fornowCorrect);
    setLetters(fornowRemain);
    setWrongLetters(fornowWrong)
}



    const enterWord = useCallback(()=>{
        switch(currentWord){
            case 1:
                if (word1.length ===5){   updateArrays(word1);  setCurrentWord(prev=> prev+1); checkIfWon(1)}
            break;
    
            case 2:
                if (word2.length ===5) {   updateArrays(word2);  setCurrentWord(prev=> prev+1); checkIfWon(2) };
            break;
    
            case 3:
                if (word3.length ===5) {  updateArrays(word3);  setCurrentWord(prev=> prev+1); checkIfWon(3) };
            break;
    
            case 4:
                if (word4.length ===5) {   updateArrays(word4); setCurrentWord(prev=> prev+1); checkIfWon(4)};
            break;
    
            case 5:
                if (word5.length ===5){   updateArrays(word5);  setCurrentWord(prev=> prev+1) ;checkIfWon(5)};
            break;
            
    
            default:
                    if (word6.length ===5){  updateArrays(word6); setCurrentWord(prev=> prev+1); checkIfWon(6)};
                break;
    
        }
    },[word1,word2,word4,word3,word5,word6,currentWord])


const removeLetter = useCallback(()=>{
    switch(currentWord){
        case 1:
            if (word1.length >0) setWord1(prev => {
                const fornowWord = prev.slice(0,-1);
                return fornowWord;
            });
        break;

        case 2:
            if (word2.length >0) setWord2(prev=> prev.slice(0,-1));
        break;

        case 3:
            if (word3.length >0) setWord3(prev=> prev.slice(0,-1));
        break;

        case 4:
            if (word4.length >0) setWord4(prev=> prev.slice(0,-1));
        break;

        case 5:
            if (word5.length >0) setWord5(prev=> prev.slice(0,-1));
        break;
        

        default:
                if (word6.length >0) setWord6(prev=> prev.slice(0,-1));
            break;
    }
},[word1,word2,word3,word4,word5,word6,currentWord])

const activateKeyFunction = useCallback((event)=>{
    if(result !==null)return;
    if(event.key.length ===1 && event.key.match(/[a-z]/i)){
        addLetter(event.key);
    }
    else if (event.key === 'Backspace' || event.key==='Delete'){
        removeLetter();
    }
    else if (event.key==='Enter') enterWord();
},[addLetter,removeLetter,enterWord])

useEffect(()=>{
    let rnd = Math.floor(Math.random()*wordList.length);
    while (wordList[rnd].word.length !==5){
         rnd = Math.floor(Math.random()*wordList.length);
    }
    setRandomWord(wordList[rnd]);
},[wordList])

    
    useEffect(()=>{
       window.addEventListener('keydown',activateKeyFunction)

        return  ()=>{window.removeEventListener('keydown',activateKeyFunction)}
    },[activateKeyFunction])

    // disable alert effect
    useEffect(()=>{
        if (showAlert){
        console.log('test');
      const x = setTimeout(() => {
            setShowAlert(false);
        }, 1500);

        return(()=>clearTimeout(x))
    }
    },[showAlert])

    const liClass = (enteredWord,index) =>{
        if (!enteredWord.charAt(index)) return '';
        if (!word.includes(enteredWord.charAt(index))) return(styles.wrong);
        if (word.charAt(index)===enteredWord.charAt(index)) return(styles.correct);
        // if correct word already found , show wrong
            let existsIndex =-1;
            let sameLettersIndex = [];
            for (let i = 0 ; i < word.length;i++){
                if (word.charAt(i)===enteredWord.charAt(i) && word.charAt(i)===enteredWord.charAt(index))existsIndex=i;
                if (enteredWord.charAt(i)===enteredWord.charAt(index))sameLettersIndex.push(i);
            }
            if (existsIndex >-1 || index!==sameLettersIndex[sameLettersIndex.length-1]) return styles.wrong;
            return styles.exists;
        
    }
    const resetGame = () =>{
        props.closeGame(0);
    }

    return(
        <div className={styles.mainContainer}>
            {showAlert && <p className={styles.resultP}>WORD DOESNT EXIST IN DATABSE</p>}
            {result && <p className={styles.resultP} onClick={resetGame}>Good Job ! the word was {word.toUpperCase() + ' - ' + randomWord.translate} ! Click to exit</p>}
            { result ===false && <p className={styles.resultP} onClick={resetGame}> So close ! The Word Was {word.toUpperCase()+' - ' + randomWord.translate} , Click to exit</p>}
            <section onClick={()=>props.closeGame(0)} className={styles.menu}><IoMdArrowRoundBack/>  <p>Back To Games</p></section>
            <ul className={currentWord >1 ? styles.active : ''}> <li className={liClass(word1,0)}>{word1.charAt(0)}</li> <li className={liClass(word1,1)}>{word1.charAt(1)}</li> <li className={liClass(word1,2)}>{word1.charAt(2)}</li> <li className={liClass(word1,3)}>{word1.charAt(3)}</li> <li className={liClass(word1,4)}> {word1.charAt(4)}</li>  </ul>
            <ul className={currentWord >2 ? styles.active : ''}> <li className={liClass(word2,0)}>{word2.charAt(0)}</li> <li className={liClass(word2,1)}>{word2.charAt(1)}</li> <li className={liClass(word2,2)}>{word2.charAt(2)}</li> <li className={liClass(word2,3)}>{word2.charAt(3)}</li> <li className={liClass(word2,4)}>{word2.charAt(4)}</li>  </ul>
            <ul className={currentWord >3 ? styles.active : ''}> <li className={liClass(word3,0)}>{word3.charAt(0)}</li> <li className={liClass(word3,1)}>{word3.charAt(1)}</li> <li className={liClass(word3,2)}>{word3.charAt(2)}</li> <li className={liClass(word3,3)}>{word3.charAt(3)}</li> <li className={liClass(word3,4)}>{word3.charAt(4)}</li>  </ul>
            <ul className={currentWord >4 ? styles.active : ''}> <li className={liClass(word4,0)}>{word4.charAt(0)}</li> <li className={liClass(word4,1)}>{word4.charAt(1)}</li> <li className={liClass(word4,2)}>{word4.charAt(2)}</li> <li className={liClass(word4,3)}>{word4.charAt(3)}</li> <li className={liClass(word4,4)}>{word4.charAt(4)}</li>  </ul>
            <ul className={currentWord >5 ? styles.active : ''}> <li className={liClass(word5,0)}>{word5.charAt(0)}</li> <li className={liClass(word5,1)}>{word5.charAt(1)}</li> <li className={liClass(word5,2)}>{word5.charAt(2)}</li> <li className={liClass(word5,3)}>{word5.charAt(3)}</li> <li className={liClass(word5,4)}>{word5.charAt(4)}</li>  </ul>
            <ul className={currentWord >6 ? styles.active : ''}> <li className={liClass(word6,0)}>{word6.charAt(0)}</li> <li className={liClass(word6,1)}>{word6.charAt(1)}</li> <li className={liClass(word6,2)}>{word6.charAt(2)}</li> <li className={liClass(word6,3)}>{word6.charAt(3)}</li> <li className={liClass(word6,4)}>{word6.charAt(4)}</li>  </ul>

            
            
            <section className={styles.keysContainer}>
                <div>
                <li className={`${foundLetters.includes('q') && styles.correct} ${existsLetters.includes('q') && styles.exists} ${wrongLetters.includes('q') && styles.wrong}`} onClick={()=>{addLetter('q')}}>q</li>
                <li className={`${foundLetters.includes('w') && styles.correct} ${existsLetters.includes('w') && styles.exists} ${wrongLetters.includes('w') && styles.wrong}`} onClick={()=>{addLetter('w')}}>w</li>
                <li className={`${foundLetters.includes('e') && styles.correct} ${existsLetters.includes('e') && styles.exists} ${wrongLetters.includes('e') && styles.wrong}`} onClick={()=>{addLetter('e')}}>e</li>
                <li className={`${foundLetters.includes('r') && styles.correct} ${existsLetters.includes('r') && styles.exists} ${wrongLetters.includes('r') && styles.wrong}`} onClick={()=>{addLetter('r')}}>r</li>
                <li className={`${foundLetters.includes('t') && styles.correct} ${existsLetters.includes('t') && styles.exists} ${wrongLetters.includes('t') && styles.wrong}`} onClick={()=>{addLetter('t')}}>t</li>
                <li className={`${foundLetters.includes('y') && styles.correct} ${existsLetters.includes('y') && styles.exists} ${wrongLetters.includes('y') && styles.wrong}`} onClick={()=>{addLetter('y')}}>y</li>
                <li className={`${foundLetters.includes('u') && styles.correct} ${existsLetters.includes('u') && styles.exists} ${wrongLetters.includes('u') && styles.wrong}`} onClick={()=>{addLetter('u')}}>u</li>
                <li className={`${foundLetters.includes('i') && styles.correct} ${existsLetters.includes('i') && styles.exists} ${wrongLetters.includes('i') && styles.wrong}`} onClick={()=>{addLetter('i')}}>i</li>
                <li className={`${foundLetters.includes('o') && styles.correct} ${existsLetters.includes('o') && styles.exists} ${wrongLetters.includes('o') && styles.wrong}`} onClick={()=>{addLetter('o')}}>o</li>
                <li className={`${foundLetters.includes('p') && styles.correct} ${existsLetters.includes('p') && styles.exists} ${wrongLetters.includes('p') && styles.wrong}`} onClick={()=>{addLetter('p')}}>p</li>
                </div>
                <div>
                <li className={`${foundLetters.includes('a') && styles.correct} ${existsLetters.includes('a') && styles.exists} ${wrongLetters.includes('a') && styles.wrong}`} onClick={()=>{addLetter('a')}}>a</li>
                <li className={`${foundLetters.includes('s') && styles.correct} ${existsLetters.includes('s') && styles.exists} ${wrongLetters.includes('s') && styles.wrong}`} onClick={()=>{addLetter('s')}}>s</li>
                <li className={`${foundLetters.includes('d') && styles.correct} ${existsLetters.includes('d') && styles.exists} ${wrongLetters.includes('d') && styles.wrong}`} onClick={()=>{addLetter('d')}}>d</li>
                <li className={`${foundLetters.includes('f') && styles.correct} ${existsLetters.includes('f') && styles.exists} ${wrongLetters.includes('f') && styles.wrong}`} onClick={()=>{addLetter('f')}}>f</li>
                <li className={`${foundLetters.includes('g') && styles.correct} ${existsLetters.includes('g') && styles.exists} ${wrongLetters.includes('g') && styles.wrong}`} onClick={()=>{addLetter('g')}}>g</li>
                <li className={`${foundLetters.includes('h') && styles.correct} ${existsLetters.includes('h') && styles.exists} ${wrongLetters.includes('h') && styles.wrong}`} onClick={()=>{addLetter('h')}}>h</li>
                <li className={`${foundLetters.includes('j') && styles.correct} ${existsLetters.includes('j') && styles.exists} ${wrongLetters.includes('j') && styles.wrong}`} onClick={()=>{addLetter('j')}}>j</li>
                <li className={`${foundLetters.includes('k') && styles.correct} ${existsLetters.includes('k') && styles.exists} ${wrongLetters.includes('k') && styles.wrong}`} onClick={()=>{addLetter('k')}}>k</li>
                <li className={`${foundLetters.includes('l') && styles.correct} ${existsLetters.includes('l') && styles.exists} ${wrongLetters.includes('l') && styles.wrong}`} onClick={()=>{addLetter('l')}}>l</li>
                </div>
                <div>
                <li onClick={()=>{enterWord()}}>ETR</li>
                <li className={`${foundLetters.includes('z') && styles.correct} ${existsLetters.includes('z') && styles.exists} ${wrongLetters.includes('z') && styles.wrong}`} onClick={()=>{addLetter('z')}}>z</li>
                <li className={`${foundLetters.includes('x') && styles.correct} ${existsLetters.includes('x') && styles.exists} ${wrongLetters.includes('x') && styles.wrong}`} onClick={()=>{addLetter('x')}}>x</li>
                <li className={`${foundLetters.includes('c') && styles.correct} ${existsLetters.includes('c') && styles.exists} ${wrongLetters.includes('c') && styles.wrong}`} onClick={()=>{addLetter('c')}}>c</li>
                <li className={`${foundLetters.includes('v') && styles.correct} ${existsLetters.includes('v') && styles.exists} ${wrongLetters.includes('v') && styles.wrong}`} onClick={()=>{addLetter('v')}}>v</li>
                <li className={`${foundLetters.includes('b') && styles.correct} ${existsLetters.includes('b') && styles.exists} ${wrongLetters.includes('b') && styles.wrong}`} onClick={()=>{addLetter('b')}}>b</li>
                <li className={`${foundLetters.includes('n') && styles.correct} ${existsLetters.includes('n') && styles.exists} ${wrongLetters.includes('n') && styles.wrong}`} onClick={()=>{addLetter('n')}}>n</li>
                <li className={`${foundLetters.includes('m') && styles.correct} ${existsLetters.includes('m') && styles.exists} ${wrongLetters.includes('m') && styles.wrong}`} onClick={()=>{addLetter('m')}}>m</li>
                <li  onClick={()=>{removeLetter()}}><FiDelete/></li>
                </div>
            </section>
            

        </div>
    )
}
export default Wordle;