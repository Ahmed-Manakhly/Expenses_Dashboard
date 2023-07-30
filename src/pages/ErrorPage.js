import Sidebar from '../components/UI/Sidebar' ;
import classes from './ErrorPage.module.scss' ;
import React from 'react';

const ErrorPage = () => {
    //-------------------------------------------------

    return <div className={classes.errorPage}>
        <Sidebar/>
        <main className={`${classes['text-error']} d-flex flex-column justify-content-center align-items-center mb-2`}>
            <h1>Something went wrong!</h1>
        </main>
    </div>
} ;
export default ErrorPage ;