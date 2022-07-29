import styles from './Dictionary.module.css';
import PortalCard from '../UI/PortalCard';
import { useDispatch , useSelector } from 'react-redux';
import { themeActions } from '../../store/themeSlice';
import List from './List';
import { useRef, useState } from 'react';

const Dictionary = () =>{
    // not most optimized because mapping everytime , instead I can only filter .
    const [currentList,setCurrentList] = useState(1);
    const elementRef = useRef();
const scrollToTop = () =>{
  const div =  elementRef.current;
  setTimeout(() => {
    
      div.scrollTop=0;
  }, 50);
}

    const list = useSelector(state=> state.data.wordList);
    const leftList = useSelector(state=> state.data.leftList);
    const learnedList = JSON.parse(localStorage.getItem('learnedList'));
    let wantedList = list;
    if (currentList === 2) wantedList = leftList;
    if (currentList ===3) wantedList = learnedList;

    let length;
    if (wantedList) length = wantedList.length; else length=0;
    //const content = list.map( (item,index) => <li key={index}> <p>{item.word}</p> <p>{item.translate}</p></li>)
    //console.table(list);
    const dispatch = useDispatch();
    const closePortal = () =>{
        dispatch(themeActions.toggleList());
    }

    const changeList = selectElement =>{
        setCurrentList(parseInt(document.getElementById('listType').value));
    }

    return(
        <PortalCard closePortal={closePortal}>
         <div ref={elementRef} className={styles.mainContainer}>
          <label htmlFor="listType">Choose List</label>
          <select onChange={changeList} id="listType">
            <option value="1">All words</option>
            <option value="2">Remaining words</option>
            <option value="3">Learned words</option> 
          </select>
          <h3>TOTAL WORDS : {length}</h3>
         <List scrollToTop={scrollToTop} isLearned={currentList ===3} list={wantedList}/>
         </div>
        </PortalCard>
    )
}
export default Dictionary;