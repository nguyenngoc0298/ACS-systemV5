
import React from 'react';
import logo from './img/logo.png';
import './Logo.scss';


export const Logo = ()=> {
    return (<>
        <div className='logo'>
            <img src={logo} alt="" />
        </div>
    </>)
};

