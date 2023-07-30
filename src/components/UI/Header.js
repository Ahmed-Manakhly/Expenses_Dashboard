import classes from './Header.module.scss' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell ,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import img from '../../assets/tm6.jpg' ;
//--------------------
const Header = ()=>{
    return (
        <header className={`${classes.header} bg__white p__15`}>
            <div className={`${classes.search}  p__relative`}>
                <span className={``}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='fa-lg fa-fw'/>
                </span>
                <input type="search" placeholder={'Type A Keyword'} className={`p__10 b__border rad__10 tran` }/>
            </div>
            <div className={`${classes.icons}  d__flex align__center `}>
                <span className={`${classes.notification}  p__relative`}>
                    <FontAwesomeIcon icon={faBell} className='fa-lg fa-fw'/>
                </span>
                <img src={img} alt="profile" />
            </div>
        </header>
    )
} ;
export default Header