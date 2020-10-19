import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const intitalState = {
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false
}

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
const reducer = (state=intitalState,action)=>{
    switch (action.type){
        case (actionTypes.ADD_INGREDIENT):
            const updatedIngredientAdd = {[action.ingredientName] : state.ingredients[action.ingredientName]+1}
            const updatedIngredientsAdd = updateObject(state.ingredients,updatedIngredientAdd)
            const updatedStateAdd = {
                ingredients:updatedIngredientsAdd,
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
            return updateObject(state,updatedStateAdd)

        case (actionTypes.REMOVE_INGREDIENT):
            const updatedIngredientRemove = {[action.ingredientName] : state.ingredients[action.ingredientName]-1}
            const updatedIngredientsRemove = updateObject(state.ingredients,updatedIngredientRemove)
            const updatedStateRemove = {
                ingredients:updatedIngredientsRemove,
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state,updatedStateRemove)

        case (actionTypes.SET_INGREDIENTS):
            const updatedStateSetIngredients = {
                ingredients:action.payload,
                totalPrice:4,
                error:false,
                building:false
            }
            return updateObject(state,updatedStateSetIngredients)
            
            case (actionTypes.FETCH_INGREDIENTS_FAILED):
                return updateObject(state,{error:action.payload})
        default:
            return state
    }

}

export default reducer

// This file uses utility function (updateObject) in return statement to update states.


// We can also handle async call on reducer{We will learn it later on.}
// Thats why we are converting our ingredients from null to js object.
// Earlier we are taking ingredients direct from the firebase.