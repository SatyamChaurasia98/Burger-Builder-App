import * as actionTypes from '../actions/actionTypes'

const initialState = {
    order:[],
    loading:false,
    purchased:false,
    loadingOrder:false,
    loadingOrderError:false
}

const reducer = (state = initialState,action)=>{
    switch (action.type) {
        case (actionTypes.PURCHASE_BURGER_SUCCESS):
            const newOrder = {
                ...action.orderData,
                id:action.orderId
            }
            return {
                ...state,
                loading:false,
                purchased:true,
                order:state.order.concat(newOrder)
            }
        case (actionTypes.PURCHASE_BURGER_FAIL):
            return {
                ...state,
                loading:false
            }
        case (actionTypes.PURCHASE_BURGER_START):
            return{
                ...state,
                loading:true
            }
        case (actionTypes.PURCHASE_INIT):
            return{
                ...state,
                purchased:false
            }
        case (actionTypes.FETCH_ORDERS_SUCCESS):
            return{
                ...state,
                order:action.orderList,
                loadingOrder:false,
                loadingOrderError:false
            }
        case (actionTypes.FETCH_ORDERS_FAIL):
            return{
                ...state,
                loadingOrder:false,
                loadingOrderError:true
            }
        case (actionTypes.FETCH_ORDERS_START):{
            return{
                ...state,
                loadingOrder:true
            }
        }
        default:
            return state;
    }
}

export default reducer;

// This file uses simple methods to update state.
// Updating using utility method (updateObject()) is not mandatory. Its optional