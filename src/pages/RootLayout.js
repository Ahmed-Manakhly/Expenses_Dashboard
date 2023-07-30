import {Outlet } from 'react-router-dom' ;
import Sidebar from '../components/UI/Sidebar' ;
import classes from './RootLayout.module.scss' ;
import Header from '../components/UI/Header'


const RootLayout = () => {
    //----------------------------------------
    return (
        <>
            <Header/>
            <div className={`${classes.page} d__flex `}>
                <Sidebar/>
                <main className={`${classes.content} w__full ovh`}>
                    <Outlet/>
                </main>
            </div>
        </>
    )
} ;
export default RootLayout ;