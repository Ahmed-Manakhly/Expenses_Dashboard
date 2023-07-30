import classes from './Summary.module.scss' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList ,faRectangleXmark , faCircleCheck , faSpinner} from '@fortawesome/free-solid-svg-icons'
import { useSelector }  from 'react-redux'; 


const Summary = ()=> {
    //--------------------------------------
    const summaryAction = useSelector(state => state.profile.summaryAction) ;
    //--------------------------------------
    return (<div className={`${classes.summary} bg__white p__20 rad__10 txt_c_mobile block_mobile ovh`}>
        <h2 className='mt__0 mb__10'>Summary Of Taken Actions</h2>
        <p className='mt__0 mb__20 c__gray fs__15 '>submit every expense day by day to get an accurate analysis</p>
        <div className="d__flex txt__c gap__20 f__wrap">
            <div className={`${classes.box} p__20 rad__10 c__gray fs__13`}>
                <FontAwesomeIcon icon={faClipboardList} className={`fa-2x mb__10 c__orange`}/>  
                <span className="d__block c__black fw__bold fs__25 mb__5  ">{summaryAction.total}</span>
            Total</div>

            <div className={`${classes.box} p__20 rad__10 c__gray fs__13`}>
                <FontAwesomeIcon icon={faCircleCheck} className={`fa-2x mb__10 c__green`}/>  
                <span className="d__block c__black fw__bold fs__25 mb__5  ">{summaryAction.saved}</span>
            saved</div>

            <div className={`${classes.box} p__20 rad__10 c__gray fs__13`}>
            <FontAwesomeIcon icon={faSpinner} className={`fa-2x mb__10 c__blue`}/>
                <span className="d__block c__black fw__bold fs__25 mb__5  ">{summaryAction.updated}</span>
            Updated</div>

            <div className={`${classes.box} p__20 rad__10 c__gray fs__13`}>
            <FontAwesomeIcon icon={faRectangleXmark} className={`fa-2x mb__10 c__red`}/>
                <span className="d__block c__black fw__bold fs__25 mb__5  ">{summaryAction.deleted}</span>
            Deleted</div>
        </div>
    </div>
    )
}

export default Summary ;

