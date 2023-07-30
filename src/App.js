import 'bootstrap/dist/css/bootstrap.min.css' ;
import {createBrowserRouter , RouterProvider } from 'react-router-dom' ;
import RootLayout from './pages/RootLayout' ;
import RecordsPage from './pages/RecordsPage' ;
import ErrorPage from './pages/ErrorPage' ;
import Dashboard from './pages/Dashboard' ;
import ProfilePage from './pages/ProfilePage' ;
import { useSelector ,useDispatch} from 'react-redux'; 
import {transActions} from './store/transformation-slice' ;
import {proActions} from './store/User-slice' ;
//------------------------------------------------
import { getExpensesList , sendEx } from './lib/api';
import useHttp from './hooks/use-http'; 
import Notification from './components/UI/Notification' ;
import {useEffect } from 'react';
import {uiActions} from './store/UI-slice' ; 
//------------------------------------------------------


const App = ()=> {

  const items = useSelector(state => state.trans.loadedData) ;
  const filterChanged = useSelector(state => state.trans.filterChanged) ;
  const actionType = useSelector(state => state.trans.action) ;
  const dataChanged = useSelector(state => state.trans.dataChanged) ;
  const showNotification = useSelector(state => state.ui.showNotification) ;
  const dispatch = useDispatch(); 

  //----------------------- get the data and send data using redux and cus hook
  const {getRequest , status  , message } = useHttp(getExpensesList ) ;
  const {sendRequest :sendNewRequest , status :sendStatus  , message :sendMessage , title } = useHttp(sendEx , true) ;
  //-------------------------

  const newData = useSelector(state => state.trans.newData) ;
  const toBeSent = useSelector(state => state.trans.toBeSent) ;
  //-----------------------

  useEffect(()=>{
    dispatch(getRequest()) ;
  } , [getRequest ,dispatch ]) ; 
  //=======================================
  useEffect(()=>{ 
    if (filterChanged ){
      dispatch(transActions.gettingData(items)) ;
    }
  } , [dispatch , filterChanged,items]) ;
  //----------------------------

  useEffect(()=>{ 
    if (toBeSent){
      const postData = async ()=> {
        await sendNewRequest(newData) ;
        dispatch(uiActions.showNotification(true)) ;
        dispatch(transActions.sendStateStop()) ;
        dispatch(transActions.dataChanged(true)) ;
      }
      postData() ;
    }
  } , [dispatch ,toBeSent,newData,sendNewRequest]) ; 
  //-----------------------------------

  useEffect(()=>{ 
    if (dataChanged ){
      dispatch(getRequest()) ;
      dispatch(proActions.gettingType(actionType)) ;
      dispatch(transActions.dataChanged(false)) ;

    }
  } , [dispatch ,dataChanged ,getRequest,toBeSent,actionType]) ;
  // ------------------------------------

  const hideNotificationHandler = ()=> {
    dispatch(uiActions.showNotification(false)) ;
  };
  //--------------------- PROPS
  const  recordsPageProps = {
    status,
    message,
  }
  //--------------------------------------------/ routes
  const router = createBrowserRouter([
    {path: '/' , element : <RootLayout/>  , errorElement : <ErrorPage/> ,children:[
        {index : true , element : <RecordsPage {...recordsPageProps}/> },
        {path: 'dashboard', element : <Dashboard />},
        {path: 'profile', element : <ProfilePage/>},
        ]
      }
    ]
  )
  //----------------------------------------------------/
  return (
    <>
        {showNotification && <Notification status={sendStatus} title={title} message={sendMessage} onAnimationEnd={hideNotificationHandler}/>}
        <RouterProvider router={router}/>
    </>
  );
}

export default App; 

