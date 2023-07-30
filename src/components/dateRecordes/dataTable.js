import LoadingSpinner from '../UI/LoadingSpinner' ;
import {grandTotal ,formattingFullDate ,colTotal} from '../../lib/api' ;
import classes from './dataTable.module.scss' ;
import ExpensesFilter from './ExpensesFilter' ;  
import Tabs from '../UI/Tabs' ;
import {useSearchParams } from 'react-router-dom' ;
import { useState , useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan , faFilePen , faRotate} from '@fortawesome/free-solid-svg-icons'
import WarningModal from '../UI/WarningModal' ;
import ToggleSwitch from  '../UI/ToggleSwitch' ;
import { useSelector , useDispatch } from 'react-redux'; 
import {transActions} from '../../store/transformation-slice' ; 
import {uiActions} from '../../store/UI-slice' ; 
//-------------------------------
const DataTable = ({message , status}) =>{
  //------------------------- from store
  const dispatch = useDispatch(); 
  const daily = useSelector(state => state.trans.dailyData) ;
  const monthly = useSelector(state => state.trans.monthlyData) ;
  const yearly = useSelector(state => state.trans.yearlyData) ;
  const loaded = useSelector(state => state.trans.loadedData) ;
  const dailyFP = useSelector(state => state.trans.dailyFilterProps) ;
  const monthlyFP = useSelector(state => state.trans.monthlyFilterProps) ;
  const selctedItem = useSelector(state => state.trans.selctedItem) ;
  const openForm = useSelector(state => state.ui.openForm) ;
  const blockingOtherActions = useSelector(state => state.ui.openForm) ;
  const radioChecked = useSelector(state => state.ui.radioChecked) ;
  //------------------------------------------------------ states
  const [SearchParams]=useSearchParams() ;
  const dataMode = SearchParams.get('mode') ;
  const [warning,setWarning] = useState({show:false , type : '' , message : ''}) ;
  const [len , setLen] = useState(5) ;
  //----------------------------------------------------- store ui
  useEffect(() => {
    if(openForm){
      dispatch(uiActions.blockingOtherActions(true)) ;
      dispatch(uiActions.radioChecked(true)) ;
      dispatch(transActions.changeSelectedItem(null));
    }else{
      dispatch(uiActions.blockingOtherActions(false)) ;
      dispatch(uiActions.radioChecked(undefined)) ;
    }
  }, [openForm , dispatch]);

  //--------------------------------------------------- helpers
  let transformedData ;
  let content ;
  let filterProps ;
  let loadingContent = (<td colSpan={11} className={classes.fallBack} ><p >Waiting For Data! ...</p></td>);
  let grandTotalAmount ;
  let colTotals = {rental:0 ,electricity:0 , internet:0 , food:0 , detergents:0 , transportation:0 , maintenance:0,checkup:0};
  const keyTitles = ['rental' ,'electricity','internet','food','detergents','transportation','maintenance','checkup'] ;
  //------------------------------------------------------------------handlers
  //------------------------------------- selected row
  const selectedItemHandler = (event)=>{
    dispatch(transActions.changeSelectedItem(event.target.value));
    setWarning(false) ;
  }
  //--------------------------------------- on edit
  const onEditItem = ()=>{
    if(selctedItem){
    const selctedItemAction = {data : selctedItem ,action :'edit'}
    dispatch(transActions.takingActions(selctedItemAction)) ;
    dispatch(uiActions.openForm(true)) ;
    }else{setWarning({show:true , type : 'missing' , message : 'You Need To Select The Row Of Data To Apply Action On!'}) }
  }
  //------------------------------ on remove notification
  const onDeleteItem = ()=>{
    if(selctedItem){
      setWarning({show:true , type : 'delete' , message : 'Are you Sure You Want To Delete This Data?'}) ;
      dispatch(uiActions.blockingOtherActions(true)) ;
      dispatch(uiActions.radioChecked(true)) ;
    }else{setWarning({show:true , type : 'missing' , message : 'You Need To Select The Row Of Data To Apply Action On!'}) }
  }
  //----------------------------------------- on cancel notification
  const closeModal = ()=>{
    dispatch(transActions.changeSelectedItem(null));
    dispatch(uiActions.blockingOtherActions(false)) ;
    dispatch(uiActions.radioChecked(undefined)) ;
    setWarning(prev => {
      return {...prev , show : false}
    })
  }
  //----------------------------------------- on remove 
  const onDelete = ()=>{
    const selctedItemAction = {data : selctedItem ,action :'delete'}
    dispatch(transActions.takingActions(selctedItemAction)) ;
    closeModal();
  }
  //-------------------------------- on  update
  const onUpdate = ()=>{
    dispatch(transActions.dataChanged(true)) ;
  }
  //===============================================================================================>
  const loadMoreHandler = ()=>{
    setLen(prev => {
      if(prev + 5 < transformedData.length){
        return prev + 5
      }else {
        return transformedData.length ;
      }
    })
  }
  //===============================================================================================>
  const loadLessHandler =()=> {
    setLen(transformedData.length<5?transformedData.length:5) ;
  }
  // ----------------------------------------------------------- manage content if no data
  if(status === 'pending'){ content = <tr><td colSpan={11} className={classes.fallBack} ><LoadingSpinner/></td></tr> } ;
  if(status === 'error'){ content = <tr><td colSpan={11} className={classes.fallBack} >{message}</td></tr>}
  if(status === 'completed' && (!loaded || loaded.length === 0)){ content = <tr><td colSpan={11} className={classes.fallBack} ><p>No Data Found!</p></td></tr>} ;
  // ----------------------------------------------------------- manage content if got data
  if(status === 'completed' && loaded && loaded.length > 0 ){ 
    //======================> preparing data
    if(dataMode=== null){
      transformedData = daily ;
      filterProps = dailyFP ;
    }else if(dataMode ==='monthly'){
      transformedData = monthly ;
      filterProps = monthlyFP ;
    }else{
      transformedData = yearly ;
      filterProps = [null] ;
    }
    //======================> adding totals
    //colmun totals :
    keyTitles.forEach(ex=>{
      colTotals[ex] += colTotal(transformedData,ex) ;
    })
    //grandtotal    :
    grandTotalAmount = grandTotal(transformedData) ;
    //======================> manage content
    
    content =  transformedData?.slice(0, len)?.map((ex,index)=> { return (
      <tr key={index} className={index % 2 === 0 ? undefined : classes.dark}>
        <td><ToggleSwitch type='radio' name='date' value={ex.date || null} onChange={selectedItemHandler} disabled={blockingOtherActions} 
        checked={radioChecked?!radioChecked : undefined}  id={index}/></td>
        <td>{dataMode=== null?formattingFullDate(ex.date):ex.date}</td>
        <td>{ex.rental}</td>
        <td>{ex.electricity}</td>
        <td>{ex.internet}</td>
        <td>{ex.food}</td>
        <td>{ex.detergents}</td>
        <td>{ex.transportation}</td>
        <td>{ex.maintenance}</td>
        <td>{ex.checkup}</td>
        <td>{ex.totalRow}</td>
    </tr> )})
    
    loadingContent = (<th colSpan={11}>
                        <div className={classes.loadingActions}>
                        <div  className={classes.actions}>
                          <button onClick={loadMoreHandler} disabled={len===transformedData.length} >Load More ...</button>
                          <button onClick={loadLessHandler} disabled={transformedData.length<=5 || len === 5}  >Reset</button>
                        </div>
                        <span>Showing
                          <span className={classes.count}> {len>transformedData.length?transformedData.length:len} </span> Row(s) Of Total
                          <span className={classes.total}> {transformedData.length}</span>    
                        </span>
                      </div>
                    </th>
                    )
  } ;
  //==================================== jsx
  return (
        <div className={`${classes.records} bg__white p__20 rad__10 m__20`}>
          <WarningModal onHide={closeModal} warning={warning} onDelete={onDelete}/>
          <h2 className='mt__0 mb__20'>Expenses Data</h2>
          <Tabs />
          <div className={classes.tools}>
            <div className={classes.icons}>
              <button type="button"  onClick={onUpdate}>
                <FontAwesomeIcon icon={faRotate} size="2xl"  className={classes.update}/>
              </button>
              <button type="button" onClick={onEditItem} disabled={blockingOtherActions}>
                <FontAwesomeIcon icon={faFilePen} size="2xl" className={classes.edit} />
              </button> 
              <button type="button" onClick={onDeleteItem} disabled={blockingOtherActions} >
                <FontAwesomeIcon icon={faTrashCan} size="2xl" className={classes.remove} />
              </button> 
            </div>
            <ExpensesFilter filterProps={filterProps} />
          </div>
          <div className={classes.tableDate}>
            <table  className={`${classes.table} fs__15 w__full`} >
              <thead className='txt__c'>
                <tr >
                  <th>ACT</th>
                  <th>Date</th>
                  <th>Monthly Rental</th>
                  <th>Electricity</th>
                  <th>Internet</th>
                  <th>Food</th>
                  <th>Detergents</th>
                  <th>Transportation</th>
                  <th>Maintenance</th>
                  <th>Checkup</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className='txt__c'>
                {content}
              </tbody>
              <tfoot className='txt__c'>
                <tr>
                  <th colSpan={2}>Grand Total</th>
                  <th>{colTotals.rental}</th>
                  <th>{colTotals.electricity}</th>
                  <th>{colTotals.internet}</th>
                  <th>{colTotals.food }</th>
                  <th>{colTotals.detergents }</th>
                  <th>{colTotals.transportation }</th>
                  <th>{colTotals.maintenance }</th>
                  <th>{colTotals.checkup }</th>
                  <th>{grandTotalAmount }</th>
                </tr>
                <tr>
                    {loadingContent}
                </tr>
              </tfoot >
            </table>
          </div>
        </div>
  );
}

export default DataTable;
