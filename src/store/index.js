import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './UI-slice' ;
import transReducer from './transformation-slice' ;
import proReducer from './User-slice' ;
// import logger from 'redux-logger'
import thunk from 'redux-thunk'


const store = configureStore({reducer : {ui : uiReducer , trans : transReducer , profile : proReducer }, middleware: [thunk]  } ) ;

export default store ;