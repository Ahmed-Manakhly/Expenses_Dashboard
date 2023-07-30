import classes from './ProfilePage.module.scss' ;
import Overview from '../components/profile/Overview' ;
import Summary from '../components/dateRecordes/Summary' ;




const ProfilePage = () =>{
    return(
        <>
            <h1>My Profile</h1>
            <section className={`${classes.wrapper} d__grid gap__20`}>
                <Overview/>
                <Summary/>
            </section>
        </>
    )
}


export default ProfilePage ;