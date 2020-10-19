import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/Navigationitem'

const NavigationItems = (props)=>{
    return(
        <ul className="NavigationItems">
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.isAuthenticated?<NavigationItem link="/orders">Orders</NavigationItem>:null}
            {props.isAuthenticated?
            <NavigationItem link="/logout">Logout</NavigationItem>            
            :
            <NavigationItem link="/auth">Authentication</NavigationItem>}
        </ul>
    )
}

export default NavigationItems