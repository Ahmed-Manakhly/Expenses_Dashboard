import classes from './SummaryCharts.module.scss' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseCircleCheck ,faBoltLightning , faWifi ,faUtensils ,faJugDetergent,faBus ,faScrewdriverWrench ,
        faMoneyBillTrendUp , faStethoscope}from '@fortawesome/free-solid-svg-icons'
import {useSelector} from 'react-redux' ;
import { grandTotal ,colTotal} from '../../../lib/api' ;

const SummaryCharts = ()=> {
    const lastMonthData = useSelector(state => state.trans.lastMonthData) ;
    //-------------------------------
    let grandTotalAmount ;
    let salary = 9000;
    let colTotals = {rental:0 ,electricity:0 , internet:0 , food:0 , detergents:0 , transportation:0 , maintenance:0,checkup:0};
    const keyTitles = ['rental' ,'electricity','internet','food','detergents','transportation','maintenance','checkup'] ;
    //-----------------------------------
    //colmun totals :
    keyTitles.forEach(ex=>{
    colTotals[ex] += colTotal(lastMonthData,ex) ;
    })
    //grandtotal    :
    grandTotalAmount = grandTotal(lastMonthData) ;
    //------------------------
    const consumed = (grandTotalAmount/ salary).toFixed(2);
    const rental = (colTotals.rental / salary).toFixed(2);
    const electricity = (colTotals.electricity / salary).toFixed(2);
    const internet = (colTotals.internet / salary).toFixed(2);
    const food = (colTotals.food / salary).toFixed(2);
    const detergents = (colTotals.detergents / salary).toFixed(2);
    const transportation = (colTotals.transportation / salary).toFixed(2);
    const maintenance = (colTotals.maintenance / salary).toFixed(2);
    const checkup = (colTotals.checkup / salary).toFixed(2);
    //---------------------
    const progressList = [
        {name: 'Consumed', progress : consumed, icon : faMoneyBillTrendUp } ,
        {name: 'Rental', progress : rental, icon : faHouseCircleCheck} ,
        {name: 'Electricity', progress :electricity, icon : faBoltLightning  } ,
        {name: 'Internet', progress :internet, icon : faWifi } ,
        {name: 'Food', progress : food, icon : faUtensils  } ,
        {name: 'Detergents', progress :detergents, icon : faJugDetergent  } ,
        {name: 'Transportation', progress : transportation, icon : faBus } ,
        {name: 'Maintenance', progress :maintenance, icon : faScrewdriverWrench  } ,
        {name: 'Checkup', progress  :checkup, icon : faStethoscope } 
    ]
    //---------------------------------------------------------------------------------------
    return (
        <div className={`${classes.summary} bg__white p__20 rad__10 txt_c_mobile block_mobile ovh`}>
            <h2 className='mt__0 mb__10'>Summary Of Taken Actions</h2>
            <p className='mt__0 mb__20 c__gray fs__15 '>submit every expense day by day to get an accurate analysis</p>
            <div className="d__flex txt__c gap__20 f__wrap center__flex">
            {progressList.map((progress,index)=>{return (
            <div className={`${classes.skill} rad__10 c__gray `} key={index}>
                <FontAwesomeIcon icon={progress.icon} className={`fa-2x mb__10 c__green`}/>  
                <span className="d__block c__black fw__bold  mb__5  ">{progress.name}</span>
                <div className={`${classes.outer} `}>
                    <svg>
                        <circle cx={'50%'} cy={'50%'} r={'50%'} style={{
                            strokeDasharray: '502px',
                            strokeDashoffset: `${502-(502 * progress.progress)}px`,
                        }}></circle>
                    </svg>
                    <div className={`${classes.inner} `}>
                        <div className="number">{progress.progress*100}%</div>
                    </div>
                </div> 
            </div>)})}

            </div>
        </div> 
    )
}

export default SummaryCharts ;