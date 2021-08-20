import React from 'react'
import BurgerLogo from '../../assets/images/burger-logo.png'
import './Logo.css'
function Logo(props) {
    return (
        <div className='Logo'>
            <img src={BurgerLogo} alt=""  style={{height: props.height}} />
        </div>
    )
}

export default Logo
