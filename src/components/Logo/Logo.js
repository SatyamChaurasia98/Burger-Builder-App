import React from 'react'
import burgerLogo from '../../assets/images/28.1 burger-logo.png.png'
import './Logo.css'

const Logo=(props)=>{
    return(
        <div className="Logo" style={{height:props.height,margin:props.margin}}>
            <img src={burgerLogo} alt="MyBurger" />
        </div>
    )
}

export default Logo;