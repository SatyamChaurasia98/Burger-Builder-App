import React,{useEffect,useState} from 'react'
import Aux from '../Auxillary'
import Modal from '../../components/UI/Modal/Modal'


const withErrorHandler = (WrappedComponent,axios)=>{
    return (props)=>{
        const [Error,setError] = useState(null)

        useEffect(()=>{
            const reqInterceptor = axios.interceptors.request.use(req=>{
                console.log("WithErrorHandler")
                setError(null)
                return req
            })

            const resInterceptor = axios.interceptors.response.use(res=>res,error=>{
                console.log(error)
                setError(error)
            })
            return (()=>{
                console.log("data cleaned")
                axios.interceptors.request.eject(reqInterceptor)
                axios.interceptors.response.eject(resInterceptor)
            })
        },[])

        const errorConfirmedHandler = ()=>{
            setError(null)
        }

        return(
            <Aux>
                <Modal 
                show={Error} 
                modalClosed={()=>errorConfirmedHandler()}
                > {Error ?Error.message:Error} </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }
}

export default withErrorHandler; 