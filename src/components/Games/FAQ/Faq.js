import styles from './Faq.module.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dataActions } from '../../../store/data';
const Faq = props =>{
    const dispatch = useDispatch();
    const [word,setWord] = useState('');
    const [translate,setTranslate] = useState('');
    const backToList = () =>{
        props.closeGame(0);
    }
    const addWord = event =>{
        event.preventDefault();
        const wordObj = { word : word , translate : translate};
       dispatch(dataActions.addWord(wordObj))
       
    }
    const updateWord = (event) =>{
        setWord(event.target.value.toLowerCase());
    }
    const updateTranslate = event =>{
        setTranslate(event.target.value.toLowerCase());
    }

    return(
        <div className={styles.mainContainer}>
             <section className={styles.menu} onClick={backToList}> <IoMdArrowRoundBack/>  <p>Back To Games</p></section>
             <form className={styles.addWordSection}>
                    <input onChange={updateWord} value={word} type='text' placeholder='word'></input>
                    <input onChange={updateTranslate} value={translate} type='text' placeholder='translate'></input>
                    <button onClick={addWord}>ADD</button>
                </form>
            <section>
                <h3>Some information about the site</h3>
                <p>This site has been created for the purpose of learning and improving our english vocabulary , especially for the psychometric test, I've also used this opportunity to practice my react skills.
                    I will be adding more words on a regular basis which will automatically will be added to the users as well.
                </p>

                <section>
                    Some of the sites features : 
                    <li>Main page - System which will display words which haven't been learned yet with focus on some words</li>
                    <li>Vocabulary list - see the list of available words on the site , learned words , left words , and option to unlearn a word</li>
                    <li>Live Chat - Chat with other users, Suggest features or report a bug  , just dont abuse it / curse others </li>
                    <li>Options - set the background or even a custom one ! also customize the card background and the text color .  </li>
                    <li>Games - Play games based on the available word list of the site , more games will come soon ! </li>
                    <li> Created By -  <a target="_blank" rel='noreferrer' href='https://github.com/iLiranS'>LiranS</a> with React and firebase for practicing purposes </li>
                <h3>Some unImportant stuff about the systems</h3>
                <li>Focus system : the code choose randomly 5 words out of the left list ( words which hasn’t been answered correctly yet ) and focus on them , every second turn will be a focused turn , But it doesn’t necessarily means that the word will be a focused one , because if the focused list gets shorter the words will be shown too repeatedly , so rng comes into place , when the list gets shorter a 1/2 random will be generated which brings it into a 1/4 average.</li>
                <li> If focused list has 1 word left as well as the left list , the not focused turn will be drawn from all words.(to prevent the same word to appear twice in a row).</li>
                <li>When the player learned a word from the focus list , a new word will be added to the focus list randomly , if there is any left.. </li>
                <li>When the player finishes the left list , random word from all words array will be generated .</li>
                <li>The focus and left list are stored in localStorage for individual sessions , all words fetched form firebase database , and left list is filtering of all which doesn’t include learned .</li>
                <li>Fetching the word list happens only once on mount , that way it gets the updated word list,so left list will get updated accordingly.</li>
                <li>the main game script is reusable and only needs to get the correct word , that way I could use it in the word rush game as well.</li>               
                <li>I've tried working on a snake game which has 2 available translates and need to eat the correct one but I am missing canvas skills so it will be added eventually.</li>
                <li>the Worlde system is a bit of a mess , only one script is used for the whole game but it turned out pretty well , biggest downside is that it doesnt uses words from the word list , so for a better experience alot of 5 length words need to be added , so I can make it use the word list. alternative : api of list of words check. </li>
                <li>I've wanted to add an option to add words for the users but ... yes  , also my backend skills at the moment are very bad so I'm using simple firebase database</li>
                <li>Live chat system : based on firestorm firebase databse and shows the last 30 messages.The api isnt hided but locked to the site url . I also dont know how to clear it automatically so if it gets too big , I will clear it manually .  </li>
                <li>Missing features : snake game , something in main page like daily fact to fill empty spaces , more games , adding alot of words ...  </li>
                </section>

               
            </section>

        </div>
    )
}
export default Faq;