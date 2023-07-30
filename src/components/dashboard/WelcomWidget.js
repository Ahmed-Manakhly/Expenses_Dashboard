import classes from './WelcomWidget.module.scss' ;
import welcomeImg from '../../assets/Statistics.png' ;
import WidgetInfo from  './WidgetInfo' ;
import profileImg from '../../assets/tm6.jpg' ;

const WelcomWidget = () => {
    return (
        <div className={`${classes.welcome} bg__white rad__10 txt_c_mobile block_mobile ovh`}>
            <div className={`${classes.intro} p__20  between__flex__start  bg__eee`}>
                <div>
                    <h2 className='m__0'>Welcome!</h2>
                    <p className="c__gray mt__5">manakhly</p>
                </div>
                <img src={welcomeImg} alt="welcome_img" className={`${classes['welcome_img']} hide_in_mobile`}/>
            </div>
            <img src={profileImg} alt="profile_img" className={`${classes['profile_img']} `}/>
            <WidgetInfo/>
        </div>
    )
} ;
export default WelcomWidget ;