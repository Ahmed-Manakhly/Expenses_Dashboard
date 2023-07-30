
import classes from './Chart.module.scss';
import ChartBar from './ChartBar';
import ExpensesFilter from '../../dateRecordes/ExpensesFilter' ;
import {useSelector} from 'react-redux' ;
//-----------------------------
const Chart = props=>{
    const monthlyFP = useSelector(state => state.trans.monthlyFilterProps) ;
    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value )
    const totalMaximum = Math.max(...dataPointValues)
    return (
            <div className={`${classes.charts} bg__white p__20  rad__10 txt_c_mobile block_mobile `}>
                <h2 className='mt__0 mb__10'>Charts!</h2>
                <p className="mt__0 mb__20 c__gray fs__15">Charts too</p>
                <div className={`${classes.chart} `}>
                {props.dataPoints.map(dataPoint => <ChartBar key= {dataPoint.lable} value = {dataPoint.value} maxValue = {totalMaximum} lable = {dataPoint.lable}/>)}
                </div>
                <ExpensesFilter filterProps={monthlyFP} />
            </div>
            
    );
};



export default Chart;