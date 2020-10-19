// Without Redux**************
// import React,{Component} from 'react'
// import Aux from '../../hoc/Auxillary'
// import Burger from '../../components/Burger/Burger'
// import BuildControls from '../../components/Burger/BuildControls/BuildControls'
// import Modal from '../../components/UI/Modal/Modal'
// import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
// import axios from '../../axios-orders'
// import Spinner from '../../components/UI/Spinner/Spinner'
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

// const INGREDIENT_PRICES = {
//     salad:0.5,
//     cheese:0.4,
//     meat:1.3,
//     bacon:0.7
// }
// class BurgerBuilder extends Component {
//     state={
        
//         ingredients:null,
//         totalPrice:4,
//         purchaseable:false,
//         purchasing:false,
//         loading:false
//     }

//     componentDidMount(){
//         
//             axios.get("https://react-my-burger-9054d.firebaseio.com/ingredients.json")
//             .then(response=>{
//                 this.setState({ingredients:response.data})
//             })
//     }

//         updatePurchaseState = (ingredients)=>{
//             let totalIngredients = 0
//             for (const key in ingredients) {
//                 totalIngredients+=ingredients[key]
//             }
//             this.setState({purchaseable:totalIngredients>0})
//         }




//         addIngredientHandler = (type)=>{
//             const oldCount = this.state.ingredients[type]
//             const updatedIngredients = {
//                 ...this.state.ingredients 
//             }
//             updatedIngredients[type] = oldCount+1
//             const priceAddition = INGREDIENT_PRICES[type]
//             const newPrice = this.state.totalPrice+priceAddition
//             this.setState({ingredients:updatedIngredients,totalPrice:newPrice})
//             this.updatePurchaseState(updatedIngredients)
//         }

//     removeIngredientHandler = (type)=>{
//         const oldCount = this.state.ingredients[type]
//         if (oldCount>0){
//             const updatedIngredients = {
//                 ...this.state.ingredients
//             }
//             updatedIngredients[type] = oldCount-1
//             const priceAddition = INGREDIENT_PRICES[type]
//             const newPrice = this.state.totalPrice-priceAddition
//             this.setState({ingredients:updatedIngredients,totalPrice:newPrice})
//             this.updatePurchaseState(updatedIngredients)
//         }
//     }

//     purchasingHandler = ()=>{
//         this.setState({purchasing:true})
//     }

//     purchaseCancelHandler = ()=>{
//         this.setState({purchasing:false})
//     }

//     purchaseConitnueHandler = ()=>{
//         // window.alert("You continue!")
        
//         const queryParams = []
//         for (const i in this.state.ingredients) {
//             const data = encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i])
//             queryParams.push(data)
//         }
//         queryParams.push("price="+this.state.totalPrice)
//         const queryString = queryParams.join('&')
//         this.props.history.push({
//             pathname:'/checkout',
//         search:'?'+ queryString})
//     }
//     render(){
//         const disabledInfo = {
            
//             ...this.state.ingredients
//         }
//         for (let key in disabledInfo) {
//             disabledInfo[key] = disabledInfo[key]===0
//         }

//         let orderSummary = null
//         let burger = <Spinner/>
        
//         if(this.state.ingredients){
//             burger = (
//                 <Aux>
//                     <Burger ingredients={this.state.ingredients}/>
//                     <BuildControls
//                     ingredientAdded={(type)=>this.addIngredientHandler(type)}
//                     ingredientRemoved={this.removeIngredientHandler}
//                     disabled = {disabledInfo}
//                     price = {this.state.totalPrice}
//                     purchaseable = {this.state.purchaseable}
//                     ordered = {this.purchasingHandler}/>
//                 </Aux>
//             )
//             orderSummary = <OrderSummary 
//                             ingredients={this.state.ingredients}
//                             purchaseCancelled = {this.purchaseCancelHandler}
//                             purchaseContinued={this.purchaseConitnueHandler}
//                             price = {this.state.totalPrice}
//                             />
//         }
//         if (this.state.loading){
//             orderSummary = <Spinner/>
//         }
//         return(
//             <Aux>
//                 <Modal show={this.state.purchasing} 
//                 modalClosed ={this.purchaseCancelHandler}>
//                     {orderSummary}
//                 </Modal>
//                 {burger}
//             </Aux>      
//         )
//     }
// }


// export default withErrorHandler(BurgerBuilder,axios)
// As we can see we have already wrapped burger builder in a hoc i.e. withErrorHandler
// and we know connect() is also a higher order component but this will not produce error as
// with withErrorHandler component we have passed all props to our main component.

 // as we are using redux all state.ingredients === props.ingredients bcz
 // we have taken ingredients to global state and mapped that grobal state ingredients to "ings" in mapstateToProps
 // so now instead of state,ingredients we will use props.ings


// With redux**********
import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreator from '../../store/actions/index'
import Aux from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class BurgerBuilder extends Component {
    state={
        purchasing:false
    }

    componentDidMount(){
        this.props.onIngredientsFetched()
        // console.log(this.props)
    }
    updatePurchaseState = (ingredients)=>{
        let totalIngredients = 0
        for (const key in ingredients) {
            totalIngredients+=ingredients[key]
        }
        return totalIngredients>0
    }

    
    purchasingHandler = ()=>{
        if(!this.props.isAuthenticated){
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push("/auth")
        }
        this.setState({purchasing:true})
        this.props.onPurchaseInit()
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }

    purchaseConitnueHandler = ()=>{
        // window.alert("You continue!")
        this.props.history.push('/checkout')
    }
    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]===0
        }

        let orderSummary = null
        let burger = this.props.err?<p>Ingredinets cant be loaded</p>:<Spinner/>
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                    ingredientAdded = {(ingName)=>this.props.onIngredientAdded(ingName)}
                    ingredientRemoved = {(ingName)=>this.props.onIngredientRemoved(ingName)}
                    disabled = {disabledInfo}
                    price = {this.props.tPrice}
                    isAuth = {this.props.isAuthenticated}
                    purchaseable = {this.updatePurchaseState(this.props.ings)}
                    ordered = {this.purchasingHandler}/>
                </Aux>
            )
            orderSummary = <OrderSummary 
                            ingredients={this.props.ings}
                            purchaseCancelled = {this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseConitnueHandler}
                            price = {this.props.tPrice}
                            />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} 
                modalClosed ={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>      
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilderReducer.ingredients,
        tPrice:state.burgerBuilderReducer.totalPrice,
        err:state.burgerBuilderReducer.error,
        isAuthenticated:state.authReducer.token !== null
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName)=> dispatch(actionCreator.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(actionCreator.removeIngredient(ingName)),
        onIngredientsFetched: ()=>dispatch(actionCreator.fetchIngrdients()),
        onPurchaseInit: ()=>dispatch(actionCreator.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actionCreator.setAuthRedirect(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))
