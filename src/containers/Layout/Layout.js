// import React,{useState} from 'react'
// import Aux from '../../hoc/Auxillary'
// import './Layout.css'
// import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
// import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

// const Layout = (props)=>{
//     const [showSideDrawer,setShowSideDrawer] = useState(false)

//     const sideDrawerCosedHandler = ()=>{
//         setShowSideDrawer(false)
//     }

//     const sideDrawerToggleHandler = ()=>{
//         setShowSideDrawer((showSideDrawer)=>{
//             return !showSideDrawer
//         })
//     }
//     return(
//         <Aux>
//         <Toolbar drawerToggle = {()=>sideDrawerToggleHandler()}/>
//         <SideDrawer closed = {()=>sideDrawerCosedHandler()} show ={showSideDrawer}/>
//         <main className="content"> 
//             {props.children}
//         </main>
//     </Aux>
//     )
    
// }

// export default Layout;

// With redux
import React,{Component} from 'react'
import {connect} from 'react-redux'
import Aux from '../../hoc/Auxillary'
import './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component{
    state={
        showSideDrawer:false
    }

    sideDrawerCosedHandler = ()=>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler = ()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }
    render(){
        return(
            <Aux>
            <Toolbar 
                isAuth = {this.props.isAuthenticated}
                drawerToggle = {()=>this.sideDrawerToggleHandler()}/>
            <SideDrawer
                isAuth = {this.props.isAuthenticated} 
                closed = {()=>this.sideDrawerCosedHandler()} show ={this.state.showSideDrawer}/>
            <main className="content"> 
                {this.props.children}
            </main>
        </Aux>
        )
    }
}

const mapStateToProps = state=>{
    return{
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps)(Layout);