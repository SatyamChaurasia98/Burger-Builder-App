import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id,orderData)=>{
    console.log(id)
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = ()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL
    }
}

export const purchaseBurgerStart = ()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token)=>{
    return dispatch =>{
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth='+token,orderData)
        .then(response=>{
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        })
        .catch(error=>{
            dispatch(purchaseBurgerFail())
        })
    }
}

export const purchaseInit = ()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders)=>{
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orderList: orders
    }
}

export const fetchOrdersFailed = ()=>{
    return{
        type:actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrdersStart = ()=>{
    return{
        type:actionTypes.FETCH_ORDERS_START
    }
}
export const fetchOrders = (token,userId)=>{
    return dispatch=>{
        dispatch(fetchOrdersStart())
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
        axios.get('/orders.json'+ queryParams)
        .then(response=>{
            const fetchedOrders = []
            for (const key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id:key})
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
            // console.log(this.state.orders)
        })
        .catch(err=>{
            dispatch(fetchOrdersFailed())
        })
    }
}