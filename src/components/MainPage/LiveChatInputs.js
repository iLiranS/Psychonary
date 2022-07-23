import { useEffect, useState } from "react";
import styles from './LiveChatInputs.module.css'
import {AiOutlineSend} from 'react-icons/ai'


const LiveChatInputs = props =>{
const [msg,setMsg] = useState('');
const [msgHasTouched,setMessageHasTouched] = useState(false);
const name = props.name;


const updateMsg = el=>{
    setMsg(el.target.value);
}

const isValidMessage = () =>{
    if (msg.trim().length > 0 && msg.trim().length<250) return true;
    return false;
}

const sendMessage = event =>{
    event.preventDefault();
    setMessageHasTouched(true);
    if ( isValidMessage()) {
        props.sendMessage(name,msg);
        setMsg('');
        setMessageHasTouched(false);
    }
}


return(
    <form onSubmit={sendMessage} className={styles.inputDiv}>
    <input className={!isValidMessage() && msgHasTouched ? styles.invalid:''} value={msg} onChange={updateMsg} placeholder='message...' type='text'></input>
   <button ><AiOutlineSend className={styles.sendBtn}/></button> 
</form>
)


}
export default LiveChatInputs