import { useEffect, useState } from "react";
import styles from './LiveChatInputs.module.css'
import {AiOutlineSend} from 'react-icons/ai'


const LiveChatInputs = props =>{
const [msg,setMsg] = useState('');
const [name,setName] = useState('');
const [nameHasTouched,setNameHasTouched] = useState(false);
const [msgHasTouched,setMessageHasTouched] = useState(false);

useEffect(()=>{
    if (localStorage.getItem('name')) setName(JSON.parse(localStorage.getItem('name')))
},[])
useEffect(()=>{
    localStorage.setItem('name',JSON.stringify(name));
},[name])
const updateMsg = el=>{
    setMsg(el.target.value);
}
const updateName = e =>{
    setName(e.target.value);
}
const isValidMessage = () =>{
    if (msg.trim().length > 0 && msg.trim().length<250) return true;
    return false;
}
const isValidName = () =>{
    if (name.trim().length > 1 && name.trim().length<15 && /[a-zA-Z]/.test(name)){
        return true;
    }
    return false;
}
const sendMessage = event =>{
    event.preventDefault();
    setNameHasTouched(true);
    setMessageHasTouched(true);
    if ( isValidMessage() && isValidName()) {
        props.sendMessage(name,msg);
        setMsg('');
        setNameHasTouched(false);
        setMessageHasTouched(false);
    }
}


return(
    <form onSubmit={sendMessage} className={styles.inputDiv}>
    <input  className={!isValidName() && nameHasTouched ? styles.invalid:''} placeholder='name' value={name} onChange={updateName} type='text'></input>
    <input className={!isValidMessage() && msgHasTouched ? styles.invalid:''} value={msg} onChange={updateMsg} placeholder='message...' type='text'></input>
   <button ><AiOutlineSend className={styles.sendBtn}/></button> 
</form>
)


}
export default LiveChatInputs