
import React from 'react';
import { Header } from './Header/Header';
import { Navbar } from './Navbar/Navbar';
import './Layout.scss';


export const Layout = ({children})=> {
    return (<>
        <div className='headerWrapper'>
            <div className='boxMenu'>
                <Navbar/>
            </div>
            <div className='boxMain'>
                <Header/>
                {children}
            </div>
        </div>
    </>)
};

