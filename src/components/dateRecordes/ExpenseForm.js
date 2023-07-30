import style  from './ExpenseForm.module.scss';
import useInput from '../../hooks/Use-Input';
import {Row  , Col } from 'react-bootstrap' ;
import React  from 'react';
import {dateToYMD} from '../../lib/api' ;
import { useSelector ,useDispatch} from 'react-redux'; 
import {transActions} from '../../store/transformation-slice' ;

//-----------------------------------
const ExpenseForm = (props)=> {
    const items = useSelector(state => state.trans.loadedData) ;
    const itemToBeEdited = useSelector(state => state.trans.itemToBeEdited) ;
    const dispatch = useDispatch(); 
    
    //------------------------------------ functions
    const inputValidation = value => +value.trim() > 0 ;
    const dateValidation = value => new Date(value).toString() !== 'Invalid Date';
    const dateCheckingHandler  =  (value) => {
        if( items &&  items.length >0 ){ 
            const existingindex = items.findIndex(item => item.date.toString() === new Date(value).toString()) ;
            if(existingindex >=0){return ({itemIndex : existingindex , existing : true || false})}else {return {};}
        }else {return {};}
    }
    //------------------------------
    let toBeEditedRental ;
    let toBeEditedElectricity ;
    let toBeEditedInternet ;
    let toBeEditedFood ;
    let toBeEditedDetergents ;
    let toBeEditedTransportation ;
    let toBeEditedMaintenance  ;
    let toBeEditedCheckup ;
    let toBeEditedDate  ;
    //-------------------------
    if(itemToBeEdited){
        toBeEditedRental = itemToBeEdited.rental.toString() || '';
        toBeEditedElectricity = itemToBeEdited.electricity.toString() || '';
        toBeEditedInternet = itemToBeEdited.internet.toString() || '';
        toBeEditedFood = itemToBeEdited.food.toString() || '';
        toBeEditedDetergents = itemToBeEdited.detergents.toString() || '';
        toBeEditedTransportation = itemToBeEdited.transportation.toString() || '';
        toBeEditedMaintenance = itemToBeEdited.maintenance.toString() || '';
        toBeEditedCheckup = itemToBeEdited.checkup.toString() || '';
        toBeEditedDate = dateToYMD(itemToBeEdited.date) || '';
        dispatch(transActions.removeItemToBeEdited()) ;
    }
    //-----------------------------------------------------------------------
    const {value : rentalRecord ,hasError : rentalIsInvalid , valueIsValid : rentalIsValid ,
        valueChangeHandler : rentalChangeHandler , inputBlurHandler : rentalOnBlurHandler , reset : rentalOnReset} = useInput(inputValidation,toBeEditedRental) ;
    const {value : electricityRecord ,hasError : electricityIsInvalid , valueIsValid : electricityIsValid ,
        valueChangeHandler : electricityChangeHandler , inputBlurHandler : electricityOnBlurHandler , reset : electricityOnReset} = useInput(inputValidation,toBeEditedElectricity) ;
    const {value : internetRecord ,hasError : internetIsInvalid , valueIsValid : internetIsValid ,
        valueChangeHandler : internetChangeHandler , inputBlurHandler : internetOnBlurHandler , reset : internetOnReset} = useInput(inputValidation,toBeEditedInternet) ;
    const {value : foodRecord ,hasError : foodIsInvalid , valueIsValid : foodIsValid ,
        valueChangeHandler : foodChangeHandler , inputBlurHandler : foodOnBlurHandler , reset : foodOnReset} = useInput(inputValidation,toBeEditedFood) ;
    const {value : detergentsRecord ,hasError : detergentsIsInvalid , valueIsValid : detergentsIsValid ,
        valueChangeHandler : detergentsChangeHandler , inputBlurHandler : detergentsOnBlurHandler , reset : detergentsOnReset} = useInput(inputValidation,toBeEditedDetergents) ;
    const {value : transportationRecord ,hasError : transportationIsInvalid , valueIsValid : transportationIsValid ,
        valueChangeHandler : transportationChangeHandler , inputBlurHandler : transportationOnBlurHandler , reset : transportationOnReset} = useInput(inputValidation,toBeEditedTransportation) ;
    const {value : maintenanceRecord ,hasError : maintenanceIsInvalid , valueIsValid : maintenanceIsValid ,
        valueChangeHandler : maintenanceChangeHandler , inputBlurHandler : maintenanceOnBlurHandler , reset : maintenanceOnReset} = useInput(inputValidation,toBeEditedMaintenance) ;
    const {value : checkupRecord ,hasError : checkupIsInvalid , valueIsValid : checkupIsValid ,
        valueChangeHandler : checkupChangeHandler , inputBlurHandler : checkupOnBlurHandler , reset : checkupOnReset} = useInput(inputValidation,toBeEditedCheckup) ;
    const {value : enterdDate ,hasError : dateIsInvalid , valueIsValid : dateIsValid ,dateChecked,
        valueChangeHandler : dateChangeHandler , inputBlurHandler : dateOnBlurHandler , reset : dateOnReset} = useInput(dateValidation,toBeEditedDate,dateCheckingHandler) ;
    //--------------------------------------------------
    const amountValidation = (rentalIsValid||electricityIsValid||internetIsValid||foodIsValid||detergentsIsValid||
        transportationIsValid||maintenanceIsValid||checkupIsValid);
    //----------------------------
    const amountHasError = (rentalIsInvalid||electricityIsInvalid||internetIsInvalid||foodIsInvalid||detergentsIsInvalid||
        transportationIsInvalid||maintenanceIsInvalid||checkupIsInvalid);
    //----------------------------
    let formIsValid = false
    if(amountValidation && dateIsValid ){
        formIsValid = true;
    }
    //-------------------------------------------------------
    const controls = [
        {control : 'Monthly Rental', isInValid : rentalIsInvalid, value : rentalRecord , onChange : rentalChangeHandler,onBlur : rentalOnBlurHandler},
        {control : 'Electricity Bill', isInValid : electricityIsInvalid, value : electricityRecord, onChange : electricityChangeHandler,onBlur : electricityOnBlurHandler},
        {control : 'Internet And Mobile Bills', isInValid : internetIsInvalid, value : internetRecord, onChange : internetChangeHandler,onBlur : internetOnBlurHandler},
        {control : 'Food', isInValid : foodIsInvalid, value :foodRecord, onChange : foodChangeHandler,onBlur : foodOnBlurHandler},
        {control : 'Detergents And Cosmetics', isInValid : detergentsIsInvalid, value : detergentsRecord, onChange : detergentsChangeHandler,onBlur : detergentsOnBlurHandler},
        {control : 'Transportation', isInValid : transportationIsInvalid, value :transportationRecord, onChange : transportationChangeHandler,onBlur : transportationOnBlurHandler},
        {control : 'Maintenance', isInValid : maintenanceIsInvalid, value : maintenanceRecord, onChange : maintenanceChangeHandler,onBlur : maintenanceOnBlurHandler},
        {control : 'Checkup', isInValid : checkupIsInvalid, value : checkupRecord, onChange : checkupChangeHandler,onBlur : checkupOnBlurHandler}
    ]
    //---------------------------- 
    const submitHandler = (event) => {
        event.preventDefault();
        if(!formIsValid){ return; } ;
            const ExpenseData = {
                date : new Date(enterdDate) , rental : +rentalRecord, electricity : +electricityRecord ,
                internet : +internetRecord ,food : +foodRecord , detergents : +detergentsRecord , transportation : +transportationRecord , 
                maintenance : +maintenanceRecord , checkup : +checkupRecord
            };
            dispatch(transActions.gettingNewItem({data : ExpenseData ,duplicatedIndex : dateChecked ? dateChecked.itemIndex : null})) ;
            rentalOnReset('');
            electricityOnReset('');
            internetOnReset('');
            foodOnReset('');
            detergentsOnReset('');
            transportationOnReset('');
            maintenanceOnReset('');
            checkupOnReset('');
            dateOnReset('');
            props.onCancel() ;
    };
    //---------------------------------------------------------------------- 
    return (
        <form action="" onSubmit={submitHandler} >
            <Row className={`d-flex flex-column justify-content-center align-items-center mb-2`}>
                <Row className={`${style['control-group']} ${`d-flex flex-column justify-content-center align-items-center`}`}>
                    <Row className={`${style['form-control']} ${dateIsInvalid && style.invalid} ${`d-flex flex-column justify-content-center align-items-center`}`}>
                        <label htmlFor='date' >Date</label>
                        {(dateIsInvalid || (amountValidation && !dateIsValid) )&& <p className={style['error-text']}>Date Must Be Not Empty</p>}
                        {dateChecked && dateChecked.existing && <p className={style['error-text_']}>You are about to change an existing data!</p>}
                        <input type="date"  id='date' name={'name'}  value={enterdDate || ''} onChange={dateChangeHandler} onBlur={dateOnBlurHandler} />
                    </Row>
                    <Row className={`${style['control-group']} `}>
                        <Row>{((amountHasError && !amountValidation) ||(dateIsValid && !amountValidation)) && <Col><p className={style['error-text']}>at least one field must be not empty</p></Col>}</Row>
                        <Row md={2} xs={1} lg={3} className={`g-1`}>
                            {controls.map((item,index) =>{ return(
                                <Col key={index} className={`${style['form-control']} ${item.isInValid && style.invalid} ${'d-flex flex-column justify-content-center align-items-center'}`}   >
                                    <label htmlFor={item.control} >{item.control}</label>
                                    <input type="number" min='0' step='0.01' id={item.control} name={'name'} value={item.value || ''} onChange={item.onChange} onBlur={item.onBlur} /> 
                                </Col>)
                            })}
                        </Row>
                    </Row>
                </Row>
                <Row className={`${'form-actions'}`} >
                    <Col className={`${'form-actions-item'}`}><button type='button' onClick={props.onCancel}>Cancel</button></Col>
                    <Col className={`${'form-actions-item'}`} ><button disabled={!formIsValid} type='submit'>Add Expense</button></Col>
                </Row>
            </Row>
        </form>

    );
};

export default ExpenseForm ;