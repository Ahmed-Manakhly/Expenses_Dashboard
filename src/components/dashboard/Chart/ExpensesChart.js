import Chart from './Chart';
import {useSelector} from 'react-redux' ;

const ExpensesChart = () => {
    const data = useSelector(state => state.trans.monthlyData) ;
    //-------------------------------
    const chartDataPoints = [
        {lable : "January" , value : 0},
        {lable : "February" , value : 0},
        {lable : "March" , value : 0},
        {lable : "April" , value : 0},
        {lable : "May" , value : 0},
        {lable : "June" , value : 0},
        {lable : "July" , value : 0},
        {lable : "August" , value : 0},
        {lable : "September" , value : 0},
        {lable : "October" , value : 0},
        {lable : "November" , value : 0},
        {lable : "December" , value : 0},
    ];
    //----------------
    for (const expense of data) {
        const expenseMonth = expense.date;
        const index = chartDataPoints.findIndex(i=> i.lable === expenseMonth);
        chartDataPoints[index].value += expense.totalRow ;
    }
    return <Chart dataPoints={chartDataPoints} />
}


export default ExpensesChart ;