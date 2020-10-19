import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders'

export const addIngredient = ingName=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:ingName
    }
}

export const removeIngredient = ingName =>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:ingName
    }
}

const setIngredients = (ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        payload:ingredients
    }
}

const fetchIngredientsFailed = (error)=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
        payload:true
    }
}

export const fetchIngrdients = ()=>{
    return dispatch =>{
        axios.get('/ingredients.json')
        .then(res=>{
            dispatch(setIngredients(res.data))
        })
        .catch(error=>{
            dispatch(fetchIngredientsFailed(error))
        })
    }
}