import classes from './Overview.module.scss' ;
import img from '../../assets/tm6.jpg' ;
import UserInfo from './UserInfo' ;

const Overview = () => {
    return (
        <div className={`${classes.overview} bg__white  rad__10 d__flex align__center`}>
            <div className={`${classes.avatar}`}>
                <img src={img} alt="avatar"  className='rad__50 mb__10'/>
                <h3 className='m__0'>Manakhly_User1</h3>
                <p className="mt__10 c__gray">Accountant</p>
                <div className={`${classes.level} rad__6 bg__eee p__relative`}>
                    <span style={{width : '70%'}}></span>
                </div>
            </div>
            <UserInfo/>
        </div>
    )
} ;
export default Overview ;