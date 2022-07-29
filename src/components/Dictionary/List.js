import { useEffect, useMemo, useRef, useState } from "react";
import styles from './List.module.css';
import {IoMdRemoveCircleOutline} from 'react-icons/io';
import { useDispatch } from "react-redux";
import  { dataActions } from "../../store/data";
import {GrPrevious , GrNext} from 'react-icons/gr'

const List = props =>{
    const dispatch = useDispatch();
    const learnedList = JSON.parse(localStorage.getItem('learnedList'));
    const [page,setPage] = useState(0);
    let wordArray;
    if (learnedList && learnedList.length >0){
         wordArray =[...learnedList];
        wordArray = wordArray.map(item=>item.word);
    }
    const { isLearned} = props;
    const[searchText,setSearchText] = useState('');
    let content;
    // here I can choose how many words will be showed per page.
    const wordsPerPage = 25;

    useEffect(()=>{
        setPage(0);
    },[props.list])

    const removeWord = word =>{
       
        if (window.confirm('Unlearn the word : ' + word + ' ?')){
            // search for index 
            const index = wordArray.indexOf(word);
            learnedList.splice(index,1);
            localStorage.setItem('learnedList',JSON.stringify(learnedList));
           // tell redux that we updated localStorage hence left list should be updated.
           // should of been removed in redux , dont do calculations in components !
            dispatch(dataActions.unLearnWord(index));
        }
       
    }
    // used memo on it to prevent recalculations when its not needed.
    let list = useMemo(()=>props.list.filter(item=> item.word.includes(searchText) || item.translate.includes(searchText)).slice(page*wordsPerPage,page*wordsPerPage+wordsPerPage),[page,props.list,searchText]);
    
        if (list.length<1){
            content= <p>no words found !</p>;
        }
        else
        {
            // mapping every render doesn't take much because its 25 words max.
          if (!isLearned)content= list.map((item,index)=> <li key={index}><p>{item.word}</p> <span>-</span> <p>{item.translate}</p></li>);
          else content= list.map((item,index)=> <li key={index}><p>{item.word}</p> <span>-</span> <p>{item.translate}</p><section onClick={()=>{removeWord(item.word)}}><IoMdRemoveCircleOutline/></section></li>);
        }
    
        const prevPage = () =>{
                setPage(prev => prev-1)
                props.scrollToTop()
        }
        const nextPage = () =>{
            setPage(prev => prev+1)
            props.scrollToTop()
        }

    
    const updateSearchTextHandler = (el) =>{
        setSearchText(el.target.value.trim());
    }
    // how to calculate max page : if list is 50 so 2 pages || page=1 , 1 < 2
    const pages =  
    <section className={styles.pageSection}> 
       {page>0 ?<div onClick={prevPage}> <GrPrevious/> <p>Prev</p></div> : <div></div>}
      {page+1 <Math.floor(props.list.length/(wordsPerPage+1))+1 ?<div onClick={nextPage}><p>Next</p> <GrNext/></div> : <div></div>}
    </section>



    return(
        <div className={styles.mainlist}>
        <input  onChange={updateSearchTextHandler} value={searchText} placeholder='Search...' type='text'></input>
        <ul>
        {content}
        </ul>
        {pages}
        </div>
    )
}
export default List;