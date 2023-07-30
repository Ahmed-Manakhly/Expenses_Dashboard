import DataTable from '../components/dateRecordes/dataTable' ;
import NewExpense from '../components/dateRecordes/NewExpense' ;
import Summary from '../components/dateRecordes/Summary' ;
import classes from './RecordsPage.module.scss' ;
//------------------------------------------------------

function RecordsPage(props) { 
  //--------------------------------------------------------------
  return (
    <>
      <h1>Daily Transaction Limits</h1>
      <section className={`${classes.wrapper} d__grid gap__20`}>
          <NewExpense onSummaryActions={props.onSummaryActionsHandler}/>
          <Summary />
      </section>
      <DataTable  status={props.status} message={props.message }/>
    </>
    );
}

export default RecordsPage ;