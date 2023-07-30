import classes from './UserInfo.module.scss' ;



const UserInfo = () => {
    return (
        <div className={`${classes.userInfo} w__full txt__c__mobile`}>
            <div className={`${classes.box} p__20 d__flex align__center gap__10`} >
                <h4 className="c__gray fs__15 m__0 w__full ">General Information</h4>
                <div className="fs__14 start__flex ">
                    <span className="c__gray ">Full Name  </span>
                    <span className="ml__20 ">Ahmed El Manakhly</span>
                </div>
                <div className="fs__14 start__flex">
                    <span className="c__gray">Career</span>
                    <span className="ml__20 ">Accountant</span>
                </div>
                <div className="fs__14 start__flex ">
                    <span className="c__gray">Age</span>
                    <span className="ml__20 ">36</span>
                </div>
            </div>

            <div className={`${classes.box} p__20 d__flex align__center gap__10`} >
                <h4 className="c__gray fs__15 m__0 w__full ">General Information</h4>
                <div className="fs__14 start__flex ">
                    <span className="c__gray ">Income</span>
                    <span className="ml__20 ">35000</span>
                </div>
                <div className="fs__14 start__flex">
                    <span className="c__gray">Goal</span>
                    <span className="ml__20 ">To Manage My Expenses</span>
                </div>
                <div className="fs__14 start__flex ">
                    <span className="c__gray">Average Monthly Expenses</span>
                    <span className="ml__20 ">7000</span>
                </div>
            </div>

        </div>
    )
} ;
export default UserInfo ;