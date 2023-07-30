import {createSlice} from '@reduxjs/toolkit';

//=========================================
const proInitialState =  {summaryAction : {total:0,saved :0,updated:0,deleted :0}} ;
//=================================================
const proReducer = createSlice({
    name : 'ui' ,
    initialState : proInitialState ,
    reducers : {
        gettingType(state, action) {
            const type = action.payload;
            if(type === 'saved'){
                state.summaryAction.saved ++
                state.summaryAction.total ++
            }else if(type === 'deleted'){
                state.summaryAction.deleted ++
                state.summaryAction.total --
            }else if(type === 'updated'){
                state.summaryAction.updated ++
            }
        },
        //----------------------------------
    }
}) ;
//---------------------------------- 

export const proActions = proReducer.actions ;
export default proReducer.reducer ;