import styles from './Snake.module.css';
import {IoMdArrowRoundBack} from 'react-icons/io'
import { useEffect, useRef, useState } from 'react';

const Snake = props =>{





                                     

    return(
        <div className={styles.mainContainer}>
            <section onClick={()=>props.closeGame(0)} className={styles.menu}><IoMdArrowRoundBack/>  <p>Back To Games</p></section>
        <div className={styles.gameBoard}></div>
        </div>
    )
}

export default Snake;