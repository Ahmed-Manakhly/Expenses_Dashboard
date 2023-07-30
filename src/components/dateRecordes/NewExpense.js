import style from './NewExpense.module.scss';
import ExpenseForm from './ExpenseForm' ;
import {useSelector , useDispatch} from 'react-redux' ;
import RecordImg from '../../assets/RecordImg' ;
import {uiActions} from '../../store/UI-slice' ;
//--------------------------------------------------------

const NewExpense = () =>{
    const openForm = useSelector(state => state.ui.openForm) ;
    const dispatch = useDispatch(); 
    //---------------------------------------
    const startEditingHandler = ()=> {
        dispatch(uiActions.openForm(true)) ;
    };

    const stopEditingHandler = ()=> {
        dispatch(uiActions.openForm(false)) ;
    };
    //---------------------------------------
    return (
        <div>
            <div className={`${style['new-expense']} bg__white p__20 rad__10 txt_c_mobile block_mobile ovh`}>
                {!openForm && (<div className={`${style.start} d__flex gap__10`}>
                                <button onClick={startEditingHandler}>Add New Expense</button> 
                                <h2>Start Recording Expenses You Did!</h2>
                                <RecordImg/>
                            </div>)}
                {openForm && <ExpenseForm onCancel={stopEditingHandler}/>}
            </div>
        </div>
    );
};

export default NewExpense ;