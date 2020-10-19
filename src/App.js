import React,{useEffect,Suspense,lazy}from 'react';
import Layout from './containers/Layout/Layout'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actionCreators from './store/actions/index'

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
// import Checkout from './containers/Checkout/Checkout'
const Checkout = lazy(()=>import('./containers/Checkout/Checkout'))


const App = (props)=> {

  useEffect(()=>{
    props.onTryAutoSignup()
  },[])

  let route = (
    <Switch>
       <Route path="/auth" component={Auth}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to='/'/>
    </Switch>
  )

  if (props.isAuthenticated){
    route = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder}/>
      {/* <Route path="/checkout" component={Checkout}/> */}
      <Route path="/checkout"
      component= {(props)=>(
        <Suspense fallback={<div>Loading...</div>}>
          <Checkout{...props}/>
        </Suspense>
      )}/>
      <Route path="/auth" component={Auth}/>
      <Route path='/orders' component={Orders}/>
      <Route path='/logout' component={Logout}/>
      <Redirect to='/'/>
    </Switch>)
  }

  return (
      <BrowserRouter>
        <div>
          <Layout>
            {route}
          </Layout>
        </div>
      </BrowserRouter>
  );
}

const mapStateToProps = state =>{
  return{
    isAuthenticated:state.authReducer.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignup:()=>dispatch(actionCreators.authcheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
