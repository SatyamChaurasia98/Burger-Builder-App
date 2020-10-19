import React, { Component } from 'react'
import Aux from '../../../hoc/Auxillary'
import Button from '../../UI/Button/Button'

// const OrderSummary = (props)=>{
//     const ingredientSummary = Object.keys(props.ingredients)
//     .map((igKey,index)=>{
//         return(
//         <li key={index}>
//             <span style={{textTransform:'capitalize'}}>{igKey}:{props.ingredients[igKey]}</span>
//         </li>
//         )
//     })
//     return(
//         <Aux>
//             <h3>Your Order</h3>
//             <p>A deliciour burger with the following ingredients:</p>
//             <ul>
//                 {ingredientSummary} 
//             </ul>
//             <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
//             <p>Continue to checkout</p>
//             <Button
//             btnType={"Danger"} clicked={props.purchaseCancelled}>CANCEL</Button>
//             <Button
//             btnType={"Success"} clicked = {props.purchaseContinued}>CONTINUE</Button>
//         </Aux>
//     )
// }
class OrderSummary extends Component {
    //For using life cycle hooks we converted a functional component to class based
    // componentWillUpdate(){
    //     console.log("[OrderSummary]is called")
    // }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
    .map((igKey,index)=>{
        return(
        <li key={index}>
            <span style={{textTransform:'capitalize'}}>{igKey}:{this.props.ingredients[igKey]}</span>
        </li>
        )
    })
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A deliciour burger with the following ingredients:</p>
            <ul>
                {ingredientSummary} 
            </ul>
            <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout</p>
            <Button
            btnType={"Danger"} clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button
            btnType={"Success"} clicked = {this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        )
    }
}
 
export default OrderSummary;