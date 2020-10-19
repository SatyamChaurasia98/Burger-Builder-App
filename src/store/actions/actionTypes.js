export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const SET_INGREDIENTS = 'SET_INGREDIENTS'
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED'

export const PURCHASE_BURGER_FAIL = "PURCHASE_BURGER_FAIL"
export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS"
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START'
export const PURCHASE_INIT = 'PURCHASE_INIT'

export const FETCH_ORDERS = 'FETCH_ORDERS'
export const FETCH_ORDERS_SUCCESS = 'FETCH_OREDERS_SUCCESS'
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL'
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START'

export const AUTH_START = 'AUTH_START'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const AUTH_LOGOUT = 'AUTH_LOGOUT' 

export const SET_AUTH_REDIRECT = 'SET_AUTH_REDIRECT'
// we never add state to the middleware as it get bloaacked through redux-thunk
// redux-thunk is library used to add middleware in react through which we can use aynchronous code 
// inside the reducer function.
// Async code function executed inside the action creater is only because of redux-thunk.
// We can only add sync code to the store.