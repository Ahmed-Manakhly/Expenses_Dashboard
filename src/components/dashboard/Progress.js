import classes from './Progress.module.scss' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseCircleCheck ,faBoltLightning , faWifi ,faUtensils ,faJugDetergent,faBus ,faScrewdriverWrench ,faStethoscope} from '@fortawesome/free-solid-svg-icons'
import {useSelector} from 'react-redux' ;
import ExpensesFilter from '../dateRecordes/ExpensesFilter'
import {grandTotal  ,colTotal} from '../../lib/api' ;
//---------------------------------------------------

const Progress = () => {
    const dailyData = useSelector(state => state.trans.dailyData) ;
    const dailyFP = useSelector(state => state.trans.dailyFilterProps) ;
    //-------------------------------
    let grandTotalAmount ;
    let colTotals = {rental:0 ,electricity:0 , internet:0 , food:0 , detergents:0 , transportation:0 , maintenance:0,checkup:0};
    const keyTitles = ['rental' ,'electricity','internet','food','detergents','transportation','maintenance','checkup'] ;
    //-----------------------------------
    //colmun totals :
    keyTitles.forEach(ex=>{
    colTotals[ex] += colTotal(dailyData,ex) ;
    })
    //grandtotal    :
    grandTotalAmount = grandTotal(dailyData) ;
    //------------------------
    const rental = ((colTotals.rental / grandTotalAmount)*100 ).toFixed(2);
    const electricity = ((colTotals.electricity / grandTotalAmount)*100 ).toFixed(2);
    const internet = ((colTotals.internet / grandTotalAmount)*100 ).toFixed(2);
    const food = ((colTotals.food / grandTotalAmount)*100 ).toFixed(2);
    const detergents = ((colTotals.detergents / grandTotalAmount)*100 ).toFixed(2);
    const transportation = ((colTotals.transportation / grandTotalAmount)*100 ).toFixed(2);
    const maintenance = ((colTotals.maintenance / grandTotalAmount)*100 ).toFixed(2);
    const checkup = ((colTotals.checkup / grandTotalAmount)*100 ).toFixed(2);
    //---------------------
    const progressList = [
        {name: 'Rental', progress : rental, icon : faHouseCircleCheck, amount :colTotals.rental } ,
        {name: 'Electricity', progress :electricity, icon : faBoltLightning , amount :colTotals.electricity } ,
        {name: 'Internet', progress :internet, icon : faWifi , amount :colTotals.internet } ,
        {name: 'Food', progress : food, icon : faUtensils , amount :colTotals.food } ,
        {name: 'Detergents', progress :detergents, icon : faJugDetergent , amount :colTotals.detergents } ,
        {name: 'Transportation', progress : transportation, icon : faBus , amount :colTotals.transportation } ,
        {name: 'Maintenance', progress :maintenance, icon : faScrewdriverWrench , amount :colTotals.maintenance } ,
        {name: 'Checkup', progress  :checkup, icon : faStethoscope , amount :colTotals.checkup } ,
    ]
    //-------------------------------
    return (
        <div className={`${classes.progress} bg__white p__20  rad__10 txt_c_mobile block_mobile ovh`}>
            <h2 className='mt__0 mb__10'>Progress!</h2>
            <p className="mt__0 mb__20 c__gray fs__15">Progress too</p>
            {progressList.map((progress,index)=>{return (
                <div key={index} className={`${classes.progressRowA} center__flex `}>
                    <div className={`${classes.icon} center__flex`}>
                        <FontAwesomeIcon icon={progress.icon} className={`fa-lg `}/>
                    </div>
                    <div className={classes.details}>
                        <div className={classes.title}>
                        <span className={`fs__10 c__gray`}>{progress.name}</span>
                        <span className={`d__block mb__10 fw__blod`} >{progress.amount}</span>
                        </div>
                        <div className={`${classes.progressBar}  p__relative`}>
                            <span style={{ width : `${progress.progress}%`}} className={`${classes.progressIner} bg__blue `}>
                                <span className='bg__blue '>{`${progress.progress}%`}</span>
                            </span>
                        </div>
                    </div>
                </div>
            ) })}
            <ExpensesFilter filterProps={dailyFP} />
        </div>
    )
} ;
export default Progress ;