import { createSlice } from "@reduxjs/toolkit";


const data = createSlice({
    name:'data',
    initialState : {wordList:[],learnedList:[],leftList:[]} ,
    reducers:{
       setList(state,action){
        // gets 1 arr which is list of all words
        let fornow = []
        for ( const key in action.payload){
            fornow.push({word:action.payload[key].word,translate:action.payload[key].translate});
        }
        state.wordList = [...fornow];
        // now setting learned and left list .
        let learnedList;
        let learnedListWords;
        if (!localStorage.getItem('learnedList') ||JSON.parse(localStorage.getItem('learnedList')).length<1) {
            localStorage.setItem('learnedList',JSON.stringify([]));
            state.leftList = [...state.wordList];
            state.learnedList=[];
        }
        else {
            // already has list of learned , includes doesnt work  because reference type.
            // solution : compare words or translates (strings)
            learnedList =JSON.parse(localStorage.getItem('learnedList'));
            learnedListWords = learnedList.map(item=>item.word);
            state.leftList = fornow.filter(item => learnedListWords.indexOf(item.word)===-1);
            state.learnedList = learnedList;
        }
       

       },

       learnWord(state,action){
        // gets an item (word object) instead I wanna find index in left and splice into push
        const fornow = [...state.leftList].map(item=>item.word);
        const indexOfItem = fornow.indexOf(action.payload.word);
        if (indexOfItem ===-1){}
        else {
        state.learnedList.push(state.leftList.splice(indexOfItem,1)[0]);
        localStorage.setItem('learnedList',JSON.stringify(state.learnedList));
        }
       },
       unLearnWord(state,action){
        state.leftList.push(state.learnedList.splice(action.payload,1)[0]);
       },
       addWord(state,action){
        // payload is a word object : { word : 'x' , translate : 'y'} , before adding need to check if already exists in wordList. 
        const wordObj = action.payload;
         let wordOnlyList = [...state.wordList];
          wordOnlyList = wordOnlyList.map(item => item.word);
         if (wordOnlyList.includes(wordObj.word)) { console.log('exists')};
        // now add the word to firebase .
         fetch(process.env.REACT_APP_WORDS_API_KEY,{
             method:'POST',
             body:JSON.stringify(wordObj),
            headers: { 'Content-Type':'application/json'}
           }).then((response)=> response.json()).then((responseJson)=>{
        window.location.reload();
            console.log('word added successfully !',responseJson);
           })
          return true;
       }
    }
})
export const dataActions = data.actions;

export default data.reducer;