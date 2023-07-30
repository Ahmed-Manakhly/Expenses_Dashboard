import classes from './Dashboard.module.scss' ;
import WelcomWidget from '../components/dashboard/WelcomWidget' ;
import Progress from '../components/dashboard/Progress' ;
import ExpensesChart from '../components/dashboard/Chart/ExpensesChart';
import Pie from '../components/dashboard/Chart/Pie' ;
import SummaryCharts from '../components/dashboard/Chart/SummaryCharts' ;



const Dashboard = () =>{

    return(
        <>
            <h1 >Dashboard</h1>
            <section className={`${classes.wrapper} d__grid gap__20`}>
                <WelcomWidget/>
                <ExpensesChart />
                <Pie/>
                <Progress/>
                
            </section>
            <div className={`${classes.records} bg__white p__20 rad__10 m__20`}>
            <SummaryCharts/>
            </div>
        </>
    )
}


export default Dashboard ;