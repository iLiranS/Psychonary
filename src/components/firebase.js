import  firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore'



const config = {
  apiKey: 'AIzaSyAf8a0maH1GHEIwDyylWSW5ZafA1FbREAA',
  authDomain: 'psychonary-905a5.firebaseapp.com',
  databaseURL: 'https://psychonary-905a5-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'psychonary-905a5',
  storageBucket: 'psychonary-905a5.appspot.com',
  messagingSenderId:'355780767843',
  appId: '1:355780767843:web:73f7145be6078b384f8856',
  measurementId:'G-X1XBCF7BLP'
};
const fireBaseApp = firebase.initializeApp(config);
let db = fireBaseApp.firestore();

      

      export {db};



  
    
