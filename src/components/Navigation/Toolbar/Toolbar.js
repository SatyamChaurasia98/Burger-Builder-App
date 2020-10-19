import React from 'react'
import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/Navigationitems'
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = (props)=>{
    return(
        <header className="Toolbar">
            <DrawerToggle clicked = {props.drawerToggle}/>
            <Logo height={"80%"}/>

            <nav className="DesktopOnly">
                <NavigationItems
                isAuthenticated ={props.isAuth}/>
            </nav>
        </header>
    )
}

export default Toolbar