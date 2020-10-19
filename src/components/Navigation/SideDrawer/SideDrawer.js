import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/Navigationitems'
import './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxillary'

const SideDrawer = (props)=>{
    let attachedClasses = "SideDrawer Close"
    if (props.show ){
        attachedClasses = "SideDrawer Open"
    }
    return(
        <Aux>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={attachedClasses} onClick = {props.closed}>
                    <Logo height={"11%"} margin={"0 0 32px 0"}/>    
                <nav>
                    <NavigationItems
                    isAuthenticated={props.isAuth}/>
                </nav>
            </div> 
        </Aux>
    ) 
}

export default SideDrawer