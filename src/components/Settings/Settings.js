import styles from './Settings.module.css';
import PortalCard from '../UI/PortalCard';
import { useDispatch , useSelector } from 'react-redux';
import { themeActions } from '../../store/themeSlice';
import {AiFillQuestionCircle} from 'react-icons/ai'
import { useRef, useState } from 'react';
import { current } from '@reduxjs/toolkit';

const Settings = props =>{
    const [bg,setBg] = useState(0); // 1 to 6
    const [bgUrl,setBgUrl] = useState('');
    const textColorValue = useRef();
    const cardBgValue = useRef();
    
    const currentTextColor = useSelector(state=>state.theme.textColor);
    const currentCardBg = useSelector(state=>state.theme.cardBg);


    const dispatch = useDispatch();

    const closePortal = () =>{
        dispatch(themeActions.toggleSettings());
    }

    const isImage = url =>{
        
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    const updateTheme = (event) =>{
        event.preventDefault();
        const textColor = textColorValue.current.value;
        const cardBg = cardBgValue.current.value;
        if (bg>0 || bgUrl.trim().length>0){

            if(isImage(bgUrl)){
                dispatch(themeActions.updateTheme({bg:bgUrl,textColor,cardBg}))
            }
            else dispatch(themeActions.updateTheme(
                {bg,textColor,cardBg}
            ));
        }
        else {
            dispatch(themeActions.updateTheme(
                {textColor,cardBg}
            ));
        }

      closePortal();
    }
    const changeTheme = num =>{
         setBg(num);
    }
    const changeURL = el =>{
        setBgUrl(el.target.value);
    }

    const resetSettings = event=>{
        event.preventDefault();

        const answer = window.confirm('Reset Theme Settings ?');
        if (answer) {
            dispatch(themeActions.updateTheme());
            closePortal();
        }
        else {
            //some code
        }


  
    }
    const resetLocalStorage = ev =>{
        ev.preventDefault();
        if (window.confirm('Reset Learned words ? This option will reset your progress !')){
            localStorage.removeItem('learnedList');
            localStorage.removeItem('focusedList');
            window.location.reload();
        }
    }


    return(
        <PortalCard closePortal={closePortal}>
        <form onSubmit={updateTheme}  className={styles.mainContainer}>
            <section>
                <h3>Background :</h3>
                <div>
                    <ul>
                        <li className={`${styles.li1} ${bg===1 && styles.activeBg}`}  onClick={()=>changeTheme(1)}></li>
                        <li className={`${styles.li2} ${bg===2 && styles.activeBg}`}  onClick={()=>changeTheme(2)}></li>
                        <li className={`${styles.li3} ${bg===3 && styles.activeBg}`}  onClick={()=>changeTheme(3)}></li>
                    </ul>
                    <ul>
                        <li className={`${styles.li4} ${bg===4 && styles.activeBg}`}  onClick={()=>changeTheme(4)}></li>
                        <li className={`${styles.li5} ${bg===5 && styles.activeBg}`}  onClick={()=>changeTheme(5)}></li>
                        <li className={`${styles.li6} ${bg===6 && styles.activeBg}`}  onClick={()=>changeTheme(6)}></li>
                    </ul>
                </div>
            </section>

            <section className={styles.urlInput}>
              <ul style={{'display':'flex'}}><h4>URL Background</h4><li className={styles.urlInfo}><AiFillQuestionCircle /></li></ul> 
                <input type='url' placeholder='enter image url...' value={bgUrl} onChange={changeURL}></input>
            </section>
     
            <section>
                <h3>Card Background :</h3>
                <input ref={cardBgValue}  defaultValue={currentCardBg}  type='color'></input>
            </section>
            <section>
                <h3>Text Color :</h3>
                <input ref={textColorValue} defaultValue={currentTextColor}  type='color'></input>
            </section>
            <button>Apply</button>

            <section>
                <button onClick={resetSettings}>Reset Theme</button>
                <button onClick={resetLocalStorage}>Reset Learned Words</button>

            </section>


        </form>
    </PortalCard>
    )
}

export default Settings;