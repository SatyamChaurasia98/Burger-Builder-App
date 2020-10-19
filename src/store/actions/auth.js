import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = ()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (userId,token)=>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId:userId,
        token:token
    }
}

export const authFail = (error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime*1000)
    }
} 

export const auth =(email,password,isSignup)=>{
    return dispatch =>{
        dispatch(authStart())
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCezFPy8DrhDDVmgORUw0zkpxvsOO594-A'
        if (!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCezFPy8DrhDDVmgORUw0zkpxvsOO594-A'
        }
        axios.post(url,authData)
        .then(response=>{
            const expirationDate = new Date (new Date().getTime()+response.data.expiresIn*1000)
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data.localId,response.data.idToken))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err=>{
            console.log(err.response)
            dispatch(authFail(err.response.data.error))
        })
    }
}

export const setAuthRedirect = (path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT,
        path:path

    }
}

export const authcheckState = ()=>{
    return dispatch =>{
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        // console.log(token)
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate > new Date()){
                dispatch(authSuccess(userId,token))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }else{
                
                dispatch(logout())
            }
        }
    }
}