////*** Without Redux */
// import React,{Component} from 'react'
// import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
// import {Route} from 'react-router-dom'
// import ContactData from '../Checkout/ContactData/ContactData'

// class Checkout extends Component {
//     state = {
//         ingredients:null,
//         totalPrice:0
//     }
//     componentDidMount(){
//         const query = new URLSearchParams(this.props.location.search)
//         const ingredients = {}
//         let price = 0
//         for (let param  of query.entries()) {
//             if(param[0]==='price'){
//                 price = +param[1]
//             }
//             else{
//                 ingredients[param[0]] = +[param[1]]
//             }
        
//         }
//         this.setState({ingredients:ingredients,totalPrice:price})

//     }
//     checkoutCancellHandler = ()=>{
//         this.props.history.goBack()
//     }

//     checkoutContinueHandler = ()=>{
//         this.props.history.replace('/checkout/contact-data')
//     } 
//     render(){
//         return(
//             <div>
//                 {this.state.ingredients?<CheckoutSummary 
//                  ingredients={this.state.ingredients}
//                  checkoutCancelled = {this.checkoutCancellHandler}
//                  checkoutContinued = {this.checkoutContinueHandler}
//                  />:"Loading....!"}
                 
//                  <Route path={this.props.match.path +'/contact-data'} 
//                  render = {(props)=>(<ContactData ingredients={this.state.ingredients}
//                  price = {this.state.totalPrice} {...props}/>)} />
//             </div>
//         )
//     }
// }

// export default Checkout;

////********With Redux */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route,Redirect} from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'


class Checkout extends Component {
    checkoutCancellHandler = ()=>{
        this.props.history.goBack()
    }

    checkoutContinueHandler = ()=>{
        this.props.history.replace('/checkout/contact-data')
    } 

    render(){
        return(
            <div>
                {this.props.purchased?<Redirect to="/"/>:null}
                {this.props.ings?<CheckoutSummary 
                 ingredients={this.props.ings}
                 checkoutCancelled = {this.checkoutCancellHandler}
                 checkoutContinued = {this.checkoutContinueHandler}
                 />:<Redirect to="/"/>}
                 
                 <Route path={this.props.match.path +'/contact-data'} component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilderReducer.ingredients,
        tPrice:state.burgerBuilderReducer.totalPrice,
        purchased:state.orderReducer.purchased
    }   
}


export default connect(mapStateToProps)(Checkout);
