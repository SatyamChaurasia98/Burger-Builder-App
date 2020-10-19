// import React,{Component} from 'react'
// import Button from '../../../components/UI/Button/Button'
// import axios from '../../../axios-orders'
// import './ContactData.css'
// import Spinner from '../../../components/UI/Spinner/Spinner'
// import Input from '../../../components/UI/Input/Input'

// class ContactData extends Component {
//     state = {
//         orderForm:{
//             name:{
//                 elementType:'input',
//                 elementConfig:{
//                     type:'text',
//                     placeholder:'Your Name'
//                 },
//                 value:'',
//                 validation:{
//                     required:true,
//                     valid:false
//                 }
//             },
//             email:{
//                 elementType:'input',
//                 elementConfig:{
//                     type:'email',
//                     placeholder:'Your Email'
//                 },
//                 value:'',
//                 validation:{
//                     required:true,
//                     valid:false
//                 },
//                 touched:false
//             },
//             street:{
//                 elementType:'input',
//                 elementConfig:{
//                     type:'text',
//                     placeholder:'Your Street'
//                 },
//                 value:'',
//                 validation:{
//                     required:true,
//                     valid:false
//                 },
//                 touched:false
//             },
//             zipCode:{
//                 elementType:'input',
//                 elementConfig:{
//                     type:'text',
//                     placeholder:'Your ZipCode'
//                 },
//                 value:'',
//                 validation:{
//                     required:true,
//                     minLength:5,
//                     maxLength:10,
//                     valid:false
//                 },
//                 touched:false
//             },
//             country:{
//                 elementType:'input',
//                 elementConfig:{
//                     type:'text',
//                     placeholder:'Your Country'
//                 },
//                 value:'',
//                 validation:{
//                     required:true,
//                     valid:false
//                 },
//                 touched:false
//             },
//             deliveryMethod:{
//                 elementType:'select',
//                 elementConfig:{
//                     options:[{value:'fastest', displayValue:'Fastest'},
//                     {value:'cheapest', displayValue:'Cheapest'}]
//                 },
//                 value:'fastest',
//                 validation:{
//                     required:true,
//                     valid:true
//                 },
//             }
//         },  
//         formIsValid:false,
//         loading:false

//     }

//     orderHandler = (event)=>{
//         event.preventDefault()
//         // console.log(props.ingredients)
//         this.setState({loading:true})
//         const formData = {}
//         for (const formDataIdentifier in this.state.orderForm) {
//             formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value
//         }
//         const order = {
//             ingredients:this.props.ingredients,
//             price:this.props.price,
//             customer:formData
//         }
//         axios.post('/orders.json',order)
//             .then(res => {
//                 this.setState({loading:false})
//                 this.props.history.push('/')
//             })
//             .catch(error=>{
//                 this.setState({loading:false})
//             })
//     }

//     checkValidity = (value,rules)=>{
//         let isValid = true
//         if (rules.required){
//             isValid = value.trim() != ''&& isValid
//         }
//         if(rules.minLength){
//             isValid = value.length>=rules.minLength && isValid
//         }
//         if(rules.maxLength){
//             isValid = value.length<= rules.maxLength && isValid
//         }
//         return isValid
//     }

//     inputChangedHandler = (event,inputIdentifier)=>{
//         // console.log(event.target.value,inputIdentifier)
//         const updatedOrder = {...this.state.orderForm}
//         const updatedElement = {...updatedOrder[inputIdentifier]}
//         updatedElement.value = event.target.value
//         updatedElement.validation.valid = this.checkValidity(event.target.value,updatedElement.validation)
//         updatedElement.touched = true
//         updatedOrder[inputIdentifier] = updatedElement
//         let formIsValid = true
//         for (const inputIdentifier in updatedOrder) {
//             formIsValid = formIsValid && updatedOrder[inputIdentifier].validation.valid
//         }
//         console.log(formIsValid)
//         this.setState({orderForm:updatedOrder,formIsValid:formIsValid})
//     }


//     render (){
//         const formElementsArray = []
//         for (const key in this.state.orderForm) {
//             formElementsArray.push({
//                 id:key,
//                 config:this.state.orderForm[key]
//             })
//         }
//         let form = (
//                 <form onSubmit={this.orderHandler}>
//                     {formElementsArray.map(formElement=>{
//                         return(
//                             <Input key={formElement.id} elementtype={formElement.config.elementType} 
//                             elementconfig={formElement.config.elementConfig} 
//                             value={formElement.config.value}
//                             inValid = {!formElement.config.validation.valid}
//                             touched = {formElement.config.touched}
//                             changed = {(event)=>this.inputChangedHandler(event,formElement.id)} />
//                         )
//                     })}
//                     <Button btnType={'Success'} disabled={!this.state.formIsValid} >ORDER</Button>
//                 </form>
//         )
//         if (this.state.loading){
//             form = <Spinner/>
//         }

//         return(
//             <div className="ContactData">
//                 <h4>Enter your Contact Data</h4>
//                 {form}
//             </div>
//         )
//     }

// }

// export default ContactData

//***** with Redux */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreator from '../../../store/actions/index'
import checkValidity from '../../../shared/validation'

class ContactData extends Component {
    state = {
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true,
                    valid:false
                }
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required:true,
                    valid:false
                },
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street'
                },
                value:'',
                validation:{
                    required:true,
                    valid:false
                },
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your ZipCode'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:10,
                    valid:false
                },
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Country'
                },
                value:'',
                validation:{
                    required:true,
                    valid:false
                },
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[{value:'fastest', displayValue:'Fastest'},
                    {value:'cheapest', displayValue:'Cheapest'}]
                },
                value:'fastest',
                validation:{
                    required:true,
                    valid:true
                },
            }
        },  
        formIsValid:false,

    }

    orderHandler = (event)=>{
        event.preventDefault()
        // console.log(props.ingredients)
        const formData = {}
        for (const formDataIdentifier in this.state.orderForm) {
            formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value
        }
        const order = {
            ingredients:this.props.ings,
            price:this.props.tPrice,
            customer:formData,
            userId:this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token)
    }


    inputChangedHandler = (event,inputIdentifier)=>{
        // console.log(event.target.value,inputIdentifier)
        const updatedOrder = {...this.state.orderForm}
        const updatedElement = {...updatedOrder[inputIdentifier]}
        updatedElement.value = event.target.value
        updatedElement.validation.valid = checkValidity(event.target.value,updatedElement.validation)
        updatedElement.touched = true
        updatedOrder[inputIdentifier] = updatedElement
        let formIsValid = true
        for (const inputIdentifier in updatedOrder) {
            formIsValid = formIsValid && updatedOrder[inputIdentifier].validation.valid
        }
        console.log(formIsValid)
        this.setState({orderForm:updatedOrder,formIsValid:formIsValid})
    }


    render (){
        const formElementsArray = []
        for (const key in this.state.orderForm) {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement=>{
                        return(
                            <Input key={formElement.id} elementtype={formElement.config.elementType} 
                            elementconfig={formElement.config.elementConfig} 
                            value={formElement.config.value}
                            inValid = {!formElement.config.validation.valid}
                            touched = {formElement.config.touched}
                            changed = {(event)=>this.inputChangedHandler(event,formElement.id)} />
                        )
                    })}
                    <Button btnType={'Success'} disabled={!this.state.formIsValid} >ORDER</Button>
                </form>
        )
        if (this.props.loading){
            form = <Spinner/>
        }

        return(
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }

}

const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilderReducer.ingredients,
        tPrice:state.burgerBuilderReducer.totalPrice,
        loading:state.orderReducer.loading,
        token:state.authReducer.token,
        userId:state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger : (orderData,token)=>dispatch(actionCreator.purchaseBurger(orderData,token)) 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios))