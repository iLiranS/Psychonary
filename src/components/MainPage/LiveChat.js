import styles from './LiveChat.module.css';
import PortalCard from '../UI/PortalCard';
import { useDispatch , useSelector } from 'react-redux';
import { themeActions } from '../../store/themeSlice';
import  firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore'
import { useEffect, useState , useRef } from 'react';
import { db } from '../firebase';
import LiveChatInputs from './LiveChatInputs';




const LiveChat = props =>{
    console.log('re-rendered');
    const ref = useRef();
    const [messages,setMessages] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
         db.collection('messages').orderBy('createdAt').limit(30).onSnapshot((snapshot)=>{
            setMessages(snapshot.docs.map(doc => doc.data()))
        });
    } 
    ,[])

    const closePortal = () =>{
        dispatch(themeActions.toggleLiveChat());
    }


    const sendMessage = async(name,msg)=>{
            await db.collection('messages').add({
                text : msg,
                name : name,
                createdAt : firebase.firestore.FieldValue.serverTimestamp()
            })
                ref.current.scrollTop= ref.current.scrollHeight;
        
       
    }
  
    const getDateParagraph =(date)=>{
       let result = '';
       if (date.getHours()<10) result += '0';
       result += date.getHours() +':';
        if (date.getMinutes()<10) result+='0'
        result+=date.getMinutes();
        return(<p>{result}</p>)
    }
    return(
        <PortalCard closePortal={closePortal}>
            <div className={styles.mainContainer}>

                <div  ref={ref} className={styles.messageContainer}>
            {messages.map(({id,text,name , createdAt})=>
                 <div className={styles.message} key={Math.random()}>
                <p>{name}:</p>
                <p>{text}</p>
                { createdAt && getDateParagraph(createdAt.toDate())}
                </div>)}
                </div>
        <LiveChatInputs sendMessage={sendMessage}/>
                </div>
    
        </PortalCard>
    )

}
export default LiveChat;