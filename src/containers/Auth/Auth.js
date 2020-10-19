import React,{Component} from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import './Auth.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actionCreator from '../../store/actions/index'
import Aux from '../../hoc/Auxillary'
import Spinner from '../../components/UI/Spinner/Spinner'
import checkValidity from '../../shared/validation'


class Auth extends Component {
    state={
        controls:{
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
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                    valid:false
                },
                touched:false
            }
        },
        isSignup:true
    }

    componentDidMount = ()=>{
        if(!this.props.isBuilding){
            this.props.onSetAuthRedirectPath('/')
        }
    }

    submitHandler = (event)=>{
        event.preventDefault()
        const email = this.state.controls.email.value
        const password = this.state.controls.password.value
        this.props.onAuth(email,password,this.state.isSignup)
    }

    inputChangedHandler = (event,inputIdentifier)=>{
        // console.log(event.target.value,inputIdentifier)
        const updatedControls = {...this.state.controls}
        const updatedElement = {...updatedControls[inputIdentifier]}
        updatedElement.value = event.target.value
        updatedElement.validation.valid = checkValidity(event.target.value,updatedElement.validation)
        updatedElement.touched = true
        updatedControls[inputIdentifier] = updatedElement
        this.setState({controls:updatedControls})
    }

    switchAuthModeHandler = ()=>{
        this.setState(prevState =>{
            return{
                isSignup:!prevState.isSignup
            }
        })
    }

    render(){
        const formElementsArray = []
        for (const key in this.state.controls) {
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form = (
                <form onSubmit = {this.submitHandler} >
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
                    <Button btnType={'Success'}>SUBMIT</Button>
                </form>
        )
        let errorMessage = null
        if (this.props.error){
            errorMessage = this.props.error.message
        }
        let authRedirect = null
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        
        return(
            <div className="Auth">
                {this.props.loading?<Spinner/>:
                <Aux>
                    {authRedirect}
                    <p>{errorMessage}</p>
                <h3>{!this.state.isSignup?"SIGNIN":"SIGNUP"}</h3>
                {form}
                <Button btnType={'Danger'} clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup?"SIGNIN":"SIGNUP"}</Button>
                </Aux>
                }
                
            </div>
        )
    }
}
 
const mapStateToProps = state=>{
    return{
        loading:state.authReducer.loading,
        error:state.authReducer.error,
        isAuthenticated:state.authReducer.token !==null,
        isBuilding:state.burgerBuilderReducer.building,
        authRedirectPath:state.authReducer.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email,password,isSignup)=>dispatch(actionCreator.auth(email,password,isSignup)),
        onSetAuthRedirectPath:(path)=>dispatch(actionCreator.setAuthRedirect(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth)