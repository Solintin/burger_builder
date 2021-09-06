import React from 'react'
import './Button.css'

function Button(props) {
    return (
        <div >
          <button className={`Button ${props.btnType}`} onClick={props.Clicked} disabled={props.disabled}>{props.children} </button>  
        </div>
    )
}

export default Button
