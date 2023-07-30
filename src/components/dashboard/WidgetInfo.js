import classes from './WidgetInfo.module.scss' ;
import {NavLink} from 'react-router-dom';

const WidgetInfo = () =>{
    return (
            <>
                <div className={`${classes.info} tx__c d__flex p__20 mt__20  ` }>
                    <div>Ahmed El Manakhly<span className="d__block c__gray fs__14 mt__10">Accountant</span></div>
                    <div>36<span className="d__block c__gray fs__14 mt__10">years old</span></div>
                    <div>35000<span className="d__block c__gray fs__14 mt__10">Salary</span></div>
                </div>
                <span className={`${classes['profile-btn']}`}><NavLink to="/" className ={({isActive}) => isActive ? classes.active: "" } exact='true' >Record Expenses</NavLink></span>
            </>
    )
}
export default WidgetInfo