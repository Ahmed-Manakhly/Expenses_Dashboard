import { useReducer, useCallback } from 'react';
import {transActions} from '../store/transformation-slice' ;

function httpReducer(state, action) {
  if (action.type === 'SEND') {
    return { 
      title : 'sending...' ,
      data: null,
      message: 'Sending Expenses Data',
      status: 'pending',
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      title : 'success!' ,
      message: 'Expenses Data Is Sent Successfully!',
      status: 'completed',
    };
  }

  if (action.type === 'ERROR') {
    return {
      title : 'error!' ,
      data: null,
      message:'Sending/Fetching Expenses List Was Failed!' ||  action.errorMessage,
      status: 'error',
    };
  }

  return state;
}

function useHttp(requestFunction, startWithPending = false ) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    title : null ,
    status: startWithPending ? 'pending' : null,
    data: null,
    message: null,
  });
  //------------------ to send data to DB
  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: 'SEND' });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: 'SUCCESS', responseData });
      } catch (error) {
        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );
  //------------------ to GET FROM DB WITH UPDATING REDUX STORE
  const getRequest = useCallback(  () => {
      return async function (dispatching) {
        dispatch({ type: 'SEND' });
        try {
          const responseData = await requestFunction();
          dispatch({ type: 'SUCCESS', responseData });
          dispatching(transActions.gettingData(responseData));
        } catch (error) {
          dispatch({
            type: 'ERROR',
            errorMessage: error.message || 'Something went wrong!',
          });
        }
      }
    }, [requestFunction] );

  return {
    getRequest,
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
