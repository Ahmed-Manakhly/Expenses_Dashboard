import classes from './Pie.module.scss' ;
import {useSelector} from 'react-redux' ;
import { grandTotal ,colTotal} from '../../../lib/api' ;

const Pie = () =>{
    const lastMonthData = useSelector(state => state.trans.lastMonthData) ;
    //-------------------------------
    let grandTotalAmount ;

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
    const rental = {wide : (colTotals.rental / grandTotalAmount),color : "#ea5545" }
    const electricity = {wide :rental.wide + (colTotals.electricity / grandTotalAmount),color : "#ef9b20" }
    const internet = {wide : electricity.wide + (colTotals.internet / grandTotalAmount),color : "#edbf33" }
    const food = {wide : internet.wide + (colTotals.food / grandTotalAmount),color : "#bdcf32" }
    const detergents = {wide : food.wide +  (colTotals.detergents / grandTotalAmount),color : "#ede15b"  }
    const transportation = {wide :detergents.wide +  (colTotals.transportation / grandTotalAmount),color : "#87bc45" }
    const maintenance = {wide :transportation.wide +  (colTotals.maintenance / grandTotalAmount),color : "#b33dc6" }
    const checkup = {wide : maintenance.wide + (colTotals.checkup / grandTotalAmount),color : "#27aeef" }
    //---------------------
    const colorList = [
        {name: 'Rental', color : rental.color },
        {name: 'Electricity', color :electricity.color  } ,
        {name: 'Internet', color :internet.color  },
        {name: 'Food', color : food.color  } ,
        {name: 'Detergents', color :detergents.color  } ,
        {name: 'Transportation', color : transportation.color }  ,
        {name: 'Maintenance', color :maintenance.color  } ,
        {name: 'Checkup', color  :checkup.color } 
    ]
    //---------------------------------------------------------------------------------------
    return (
    <div className={`${classes.pie} bg__white p__20  rad__10 txt_c_mobile block_mobile `}>
        <h2 className='mt__0 mb__10'>Pie!</h2>
        <p className="mt__0 mb__20 c__gray fs__15">Charts too</p>
        <div className={`${classes.wrapper} `}>
            <div className={classes['pie-wrap']} style={{background: 
            `repeating-conic-gradient(from 0deg,
                ${rental.color} 0deg ${(3.6 * rental.wide)*100}deg,
                ${electricity.color} ${(3.6 * rental.wide)*100}deg ${(3.6 * electricity.wide)*100}deg,
                ${internet.color} ${(3.6 * electricity.wide)*100}deg  ${(3.6 * internet.wide)*100}deg,
                ${food.color} ${(3.6 * internet.wide)*100}deg  ${(3.6 * food.wide)*100}deg,
                ${detergents.color} ${(3.6 * food.wide)*100}deg  ${(3.6 * detergents.wide)*100}deg,
                ${transportation.color} ${(3.6 * detergents.wide)*100}deg  ${(3.6 * transportation.wide)*100}deg ,
                ${maintenance.color} ${(3.6 * transportation.wide)*100}deg  ${(3.6 * maintenance.wide)*100}deg,
                ${checkup.color} ${(3.6 * maintenance.wide)*100}deg  ${(3.6 * checkup.wide)*100}deg`
                }}>
                <div className={classes['key-wrap']}> </div>
            </div>
        </div>
        <div className={`${classes.info} tx__c  p__20  gap__20   ` }>
                {colorList.map((item,index)=>{return <div key={index}>
                    <span className={classes.box} style={{backgroundColor : `${item.color}`}}></span>
                        <span>{item.name}</span>
                                        </div>})}
        </div>
    </div>
    )
} ;
export default Pie ;


