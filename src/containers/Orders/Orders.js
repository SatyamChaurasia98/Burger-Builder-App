// import React,{Component} from 'react'
// import Order from '../../components/Order/Order'
// import Spinner from '../../components/UI/Spinner/Spinner'
// import axios from '../../axios-orders'

// class Orders extends Component {
//     state = {
//         orders:[],
//         loading:true
//     }

//     componentDidMount(){
//         axios.get('/orders.json')
//         .then(response=>{
//             const fetchedOrders = []
//             for (const key in response.data) {
//                 fetchedOrders.push({
//                     ...response.data[key],
//                     id:key})
//             }
//             this.setState({loading:false,orders:fetchedOrders})
//             // console.log(this.state.orders)
//         })
//         .catch(err=>{
//             this.setState({loading:false})
//         })
//     }
//     render(){
//         return(
//             <div>
//                 {
//                     this.state.loading?<Spinner/>:
//                     this.state.orders.map((order,index)=>{
//                         return(
//                             <Order key={index} ingredients={order.ingredients} price ={order.price} />
//                         )  
//                     })
//                 }
//             </div>
//         )
//     }
// }

// export default Orders


// with redux
import React,{Component} from 'react'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionCreator from '../../store/actions/index'
import {connect} from 'react-redux'


class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId)
    }
    render(){
        return(
            <div>
                {this.props.error?<p>Cant load orders</p>:
                    this.props.loading?<Spinner/>:
                    this.props.orders.map((order,index)=>{
                        return(
                            <Order key={index} ingredients={order.ingredients} price ={order.price} />
                        )  
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        orders:state.orderReducer.order,
        loading:state.orderReducer.loadingOrder,
        error:state.orderReducer.loadingOrderError,
        token:state.authReducer.token,
        userId:state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders:(token,userId)=>dispatch(actionCreator.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Orders)
