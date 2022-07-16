import  firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore'



const config = {
  apiKey: process.env.REACT_APP_CHAT_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJCET_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
const fireBaseApp = firebase.initializeApp(config);
let db = fireBaseApp.firestore();

      

      export {db};



  
    
