import {createSlice} from '@reduxjs/toolkit';
import {recordTotalAmount ,colTotal, filteredExpenses } from '../lib/api' ;
//================================================= helpers
let colTotals = {rental:0 ,electricity:0 , internet:0 , food:0 , detergents:0 , transportation:0 , maintenance:0,checkup:0};
const keyTitles = ['rental' ,'electricity','internet','food','detergents','transportation','maintenance','checkup'] ;
const monthString = ['January','February','March','April','May','June','July','August','September','October','November' , 'December'] ;

//=========================================  Initial State
const dataInitialState =  { loadedData : [],dailyData : [] , monthlyData:[],yearlyData:[],lastMonthData:[], filterdValue : {year : null, month : null} ,
                        monthlyFilterProps : [] , dailyFilterProps:[] ,filterChanged : false , selctedItem: null ,itemToBeEdited :null ,newData:[],
                        dataChanged: false , toBeSent :false , action : ''} ;
//========================================= Data Slice :
const transReducer = createSlice({
    name : 'transformation' ,
    initialState : dataInitialState ,
    reducers : {
        //--------------------------------------------------------------------------------
        gettingData(state, action) {
            if(action.payload && action.payload.length>0){
                //-----------------------
                state.loadedData = [...action.payload];
                //---------------------------
                const years = [...(new Set(state.loadedData?.map(item => {return item.date.getFullYear().toString();})))];
                const lastYear = Math.max(...[...(new Set(state.loadedData?.map(item => {return item.date.getFullYear()})))]).toString() ;
                const filterdDataByYear = state.loadedData? filteredExpenses((state.loadedData.slice(0,state.loadedData?.length)?.sort((a,b)=>a.date.getTime()-b.date.getTime()))
                        ,'year' , state.filterdValue.year || lastYear) : null;
                //-----------------------
                const filterdDataByLstYear = state.loadedData? filteredExpenses((state.loadedData.slice(0,state.loadedData?.length)?.sort((a,b)=>a.date.getTime()-b.date.getTime()))
                        ,'year' , lastYear) : null;
                //--------------------------------------------------------------------------------------------
                const months = [...(new Set(filterdDataByYear?.map(item => {return item.date.toLocaleString('en-US',{month :'long'});})))];
                const lastMonth = monthString[Math.max(...[...(new Set(filterdDataByYear?.map(item => {return item.date.getMonth()})))])];
                const lastMonthOfData = monthString[Math.max(...[...(new Set(filterdDataByLstYear?.map(item => {return item.date.getMonth()})))])];
                //---------------------------------------------------------------- daily data
                const filterdDataBy = filterdDataByYear ? filteredExpenses(filterdDataByYear , 'month' ,
                        state.filterdValue.month || (state.filterdValue.year==='All'&&'All') ||lastMonth ) : null ;
                state.dailyData = filterdDataBy?.map(ex=> {return {...ex, totalRow : recordTotalAmount(ex)}}) ;
                //---------------------------------------------------------------- last month data
                const filterdDataByLast = filterdDataByLstYear ? filteredExpenses(filterdDataByLstYear , 'month' ,lastMonthOfData ) : null ;
                state.lastMonthData = filterdDataByLast?.map(ex=> {return {...ex, totalRow : recordTotalAmount(ex)}}) ;
                //------------------------------------------------ CHANGE FILTER PROPS
                state.dailyFilterProps=[
                    {filterBy:'Month',range : months, default : (state.filterdValue.year==='All'&&'All')|| lastMonth},
                    {filterBy:'Year',range : years, default : lastYear },
                ] ;
                //---------------------------------------------------------------- monthly data
                state.monthlyData  = months.map(month => {
                    const arrayOfSameMonth = filterdDataByYear? filteredExpenses(filterdDataByYear , 'month' , month) : null;
                    const mergeCols = {...colTotals} ;
                    keyTitles.forEach(ex=>{
                        mergeCols[ex] += colTotal(arrayOfSameMonth,ex) ;
                    })
                    return({date : month,...mergeCols ,totalRow : recordTotalAmount(mergeCols)})
                });
                //------------------------------------------------ CHANGE FILTER PROPS
                state.monthlyFilterProps=[ null ,
                    {filterBy:'Year',range : years, default : lastYear}
                ] ;
                //---------------------------------------------------------------- yearly data
                state.yearlyData = years.map(year => {
                    const arrayOfSameYear = filteredExpenses((state.loadedData?.slice(0,state.loadedData.length)?.sort((a,b)=>a.date.getTime()-b.date.getTime())),
                            'year' , year) ;
                    const mergeCols = {...colTotals} ;
                    keyTitles.forEach(ex=>{
                        mergeCols[ex] += colTotal(arrayOfSameYear,ex) ;
                    })
                    return({date : year,...mergeCols ,totalRow : recordTotalAmount(mergeCols)})
                })
                state.filterChanged = false ;
            }else {
                state.loadedData = [];
            }
        },
        //---------------------------------------------------------------------------------
        yearsChangeHandler(state,action){
            state.filterdValue = {year : action.payload, month : null};
            state.filterChanged = true ;
        },
        //---------------------------------------------------------------------------------
        monthsChangeHandler(state,action){
            state.filterdValue = {year : state.filterdValue.year, month : action.payload} ;
            state.filterChanged = true ;
        },
        //--------------------------------------------------------
        changeSelectedItem(state,action) {
            state.selctedItem = action.payload ;
        },
        //---------------------------------------------------------------------------------
        gettingNewItem(state, action) {
            const newItem = action.payload ;
            if(state.loadedData && state.loadedData.length >0  ){ 
                if(newItem.duplicatedIndex >=0) {
                    const updatedItem = {...newItem.data}
                    state.newData = [...state.loadedData] ;
                    state.newData[newItem.duplicatedIndex] = updatedItem
                    state.action = 'updated' ;
                }else{
                    state.newData = [...state.loadedData , newItem.data] ;
                    state.action  = 'saved' ;
                }
            }else { 
                state.newData = [newItem.data] ;
                state.action  = 'saved' ;
            }
            state.toBeSent = true ;
        },
        //---------------------------------------------------------------------------------
        takingActions(state,action) {
            const requairedAction = action.payload ;
            if(state.loadedData && state.loadedData.length >0 ){
                if(requairedAction.action === 'delete'){
                    state.newData = state.loadedData.filter(item => (item.date.toString() !== new Date(requairedAction.data).toString())) ;
                    state.action  = 'deleted' ;
                    state.toBeSent = true ;
                }else{
                    const existingIndex = state.loadedData.findIndex(item => (item.date.toString() === new Date(requairedAction.data).toString())) ;
                    const existingItem = state.loadedData[existingIndex] ;
                    state.itemToBeEdited = existingItem ;
                }
            }else{return}
        },
        //---------------------------------------------------------------------------------
        dataChanged(state,action) {
            state.dataChanged = action.payload ;
        },
        //---------------------------------------------------------------------------------
        sendStateStop(state) {
            state.toBeSent = false ;
        },
        //---------------------------------------------------------------------------------
        removeItemToBeEdited(state){
            state.itemToBeEdited = null ;
        }
    },
}) ;

//---------------------------------- 
export const transActions = transReducer.actions ;
export default transReducer.reducer ;