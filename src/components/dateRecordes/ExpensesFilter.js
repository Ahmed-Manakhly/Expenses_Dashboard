import style from  './ExpensesFilter.module.scss' ;
import { useDispatch,useSelector} from 'react-redux'; 
import {transActions} from '../../store/transformation-slice' ; 

//--------------------------------------



const ExpensesFilter = ({filterProps}) => { 
    const selected = useSelector(state => state.trans.filterdValue) ;
    const dispatch = useDispatch(); 
    //----------------------------
    const onChangeMonth = (event)=>{
        dispatch(transActions.monthsChangeHandler(event.target.value));
    };
    //---------------------------
    const onChangeYear = (event)=>{
        dispatch(transActions.yearsChangeHandler(event.target.value));
    };
    //---------------------------
    return ( 
        <div className={style['expenses-filter']}>
        
        {filterProps?filterProps.map((filter,insex) => { 
            if(filter){
                return (
                    <div className={style['expenses-filter__control']} key={insex}>
                        <label>Filter by {filter.filterBy}</label>
                        <select value={(filter.filterBy === 'Year'? selected.year:selected.month)|| filter.default } onChange={filter.filterBy === 'Year'?onChangeYear:onChangeMonth}>
                            {<option value='All'>All</option>}
                            {filter.range.map(item => {return <option value={item || ''} key={item}>{item}</option>})}
                        </select>
                    </div>)
            }else{return null}}):null}
        </div>
    );
};

export default ExpensesFilter;