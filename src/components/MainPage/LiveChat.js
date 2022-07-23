import styles from './LiveChat.module.css';
import PortalCard from '../UI/PortalCard';
import { useDispatch  } from 'react-redux';
import { themeActions } from '../../store/themeSlice';
import  firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore'
import { useEffect, useState , useRef } from 'react';
import { db } from '../firebase';
import LiveChatInputs from './LiveChatInputs';
import { useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';



const LiveChat = props =>{
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
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
        const {uid,photoURL} = auth.currentUser;
            await db.collection('messages').add({
                text : msg,
                name : user.displayName,
                createdAt : firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL
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
    const signInWithGoogle = () =>{
        const auth = getAuth();
        const provider = new firebase.auth.GoogleAuthProvider();
        signInWithPopup(auth,provider).then((result)=>{

        })
    }
    const signOut = () =>{
        return(auth.currentUser && (
            <button className={styles.signOutBtn} onClick={()=> auth.signOut()}>Sign Out</button>
        ))
    }

    return(
        <PortalCard closePortal={closePortal}>
            {user &&
            <div className={styles.mainContainer}>
             
                <div  ref={ref} className={styles.messageContainer}>
            {messages.map(({photoURL,text,name , createdAt})=>
                 <div className={styles.message} key={Math.random()}>
                <img src={photoURL} alt={'user img'} ></img>
                <p>{name}:</p>
                <p>{text}</p>
                { createdAt && getDateParagraph(createdAt.toDate())}
                </div>)}
                </div>
        <LiveChatInputs name={user.displayName} sendMessage={sendMessage}/>
                {signOut()}
                </div>
               
            }
            { !user &&
                <div className={styles.mainContainer}>
                    <button className={styles.signBtn} onClick={signInWithGoogle}>Sign In</button>
                </div>
            }
    
        </PortalCard>
    )

}
export default LiveChat;