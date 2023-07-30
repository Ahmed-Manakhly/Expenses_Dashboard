// import { useState } from "react";
import { useReducer } from "react";
//-----------------------------------------------------

//-----------------------------------------------
const inputStateReducer = (state,action) => {
    if(action.type === 'INPUT' && action.dateChecking){
        return {value : action.value , isTouched : state.isTouched , dateChecking : action.dateChecking(action.value) || null};
    } ;
    if(action.type === 'INPUT'){
        return {value : action.value , isTouched : state.isTouched ,dateChecking : state.dateChecking};
    } ;
    if(action.type === 'BLUR'){
        return {value : state.value , isTouched : true ,dateChecking : state.dateChecking};
    } ;
    if(action.type === 'REST'){
        return {value : '' , isTouched : false ,dateChecking : state.dateChecking};
    } ;
    return {value : "" , isTouched : false , dateChecking : {}} ;
} ;
//-------------------------------------------------------

const useInput = (validateValue ,toBeChanged ='', dateChecking = null) => {
    const initialInputState = {value : toBeChanged, isTouched : false ,dateChecking : dateChecking ? dateChecking(toBeChanged):null} ;
    const [inputState,dispatchState] = useReducer(inputStateReducer , initialInputState) ;
//-----------------------------------------------------------------------------
    const valueIsValid = validateValue(inputState.value) ;
    const hasError = !valueIsValid && inputState.isTouched ;
//--------------------------------------------------------------------------------------
    const valueChangeHandler = (event) => {
        if(dateChecking){
            dispatchState({type : 'INPUT' , value : event.target.value, dateChecking : dateChecking});
        }
        else{
            dispatchState({type : 'INPUT' , value : event.target.value});
        }
    } ;
    //-------------------------------
    const inputBlurHandler = () =>{
        dispatchState({type : 'BLUR'});
    };
    //-------------------------------
    const reset = () => {
        dispatchState({type : 'REST'}) ;
    }

//-------------------------------------------------------------------------------------

    return {
        value : inputState.value , hasError ,valueIsValid ,dateChecked : inputState.dateChecking, valueChangeHandler, inputBlurHandler , reset
    }
} ;

export default useInput ;