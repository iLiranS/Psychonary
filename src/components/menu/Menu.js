import styles from './Menu.module.css';
import {HiOutlineHome} from 'react-icons/hi';
import {TbSettings} from 'react-icons/tb'
import {BiBook} from 'react-icons/bi';
import {RiGamepadLine} from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { themeActions } from '../../store/themeSlice';
import {RiChat4Line} from 'react-icons/ri'


const Menu = (props) =>{
    const dispatch = useDispatch();
    const changePage = page =>{
        props.changePage(page);
    }
    // maybe instead of changing page , make list and settings on top of main/games.
    const toggleSettings = () =>{
        dispatch(themeActions.toggleSettings());
    }
    const toggleList = () =>{
        dispatch(themeActions.toggleList());
    }
    const toggleLiveChat = () =>{
        dispatch(themeActions.toggleLiveChat());
    }
// home , dictionary , game , settings
    return(
        <ul className={styles.menu}>
            <li onClick={()=>{changePage('home')}} data-name='Home'><HiOutlineHome/></li>
            <li onClick={toggleList} data-name='List'><BiBook/></li>
            <li onClick={()=>{changePage('games')}} data-name='Games'><RiGamepadLine/></li>
            <li onClick={toggleLiveChat} data-name='Chat'><RiChat4Line/></li>
            <li onClick={toggleSettings} data-name='Settings'><TbSettings/></li>

        </ul>
    )
}

export default Menu;