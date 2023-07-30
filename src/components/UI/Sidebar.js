import {NavLink } from 'react-router-dom' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse , faChartSimple , faUser } from '@fortawesome/free-solid-svg-icons'
import classes from './Sidebar.module.scss' ;

function Sidebar() {
    return (
        <div className={`${classes.sidebar} bg__white p__20 p__relative`}>
            <h3 className='txt__c mt__0 p__relative'>Expenses Tracker</h3>
            <ul>
                <li >
                    <NavLink to="/" className ={({isActive}) => isActive ? classes.active: "" } exact='true' >
                        <FontAwesomeIcon icon={faHouse} className='fa-fw'/>
                        <span className='fs__14 hide_in_mobile'>Records</span>
                    </NavLink>
                </li>
                <li >
                    <NavLink to="dashboard" className ={({isActive}) => isActive ? classes.active: "" }>
                        <FontAwesomeIcon icon={faChartSimple} className='fa-fw' />
                        <span className='fs__14 hide_in_mobile' >Dashboard</span>
                    </NavLink>
                </li>
                <li >
                    <NavLink to="profile" className ={({isActive}) => isActive ? classes.active: "" }>
                        <FontAwesomeIcon icon={faUser} className='fa-fw'/>
                        <span className='fs__14 hide_in_mobile' >Profile</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;