import styles from './PortalCard.module.css';
import ReactDOM from 'react-dom';
import CardAlpha from '../CardAlpha';
import { useSelector } from 'react-redux';

const PortalCard = props =>{
    const cardBg = useSelector(state=> state.theme.cardBg);
    const bg = CardAlpha(cardBg,0.4);


    const content = <div  className={styles.mainContainer}>
        <div style={{'backgroundColor':bg}} className={styles.card}>
        {props.children}
        </div>
        <div onClick={props.closePortal} className={styles.cover}></div>
    </div>
    
    return ReactDOM.createPortal(content , document.getElementById('cover'));
}

export default PortalCard;