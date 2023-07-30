import {createSlice} from '@reduxjs/toolkit';

//=========================================
const uiInitialState =  { openForm : false, blockingOtherActions : false , radioChecked : false , showNotification : false }  ;
//=================================================
const uiReducer = createSlice({
    name : 'ui' ,
    initialState : uiInitialState ,
    reducers : {
        //--------------------------------------------------------------------------------
        openForm(state, action) {
            state.openForm = action.payload ;
        },
        blockingOtherActions(state, action) {
            state.blockingOtherActions = action.payload ;
        },
        radioChecked(state, action) {
            state.radioChecked = action.payload ;
        },
        showNotification(state, action){
            state.showNotification = action.payload ;
        },
    }
}) ;
//---------------------------------- 

export const uiActions = uiReducer.actions ;
export default uiReducer.reducer ;