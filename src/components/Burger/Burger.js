import React from 'react'
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props)=>{
    const ingredientsArray = Object.keys(props.ingredients)
    const transformedIngredientsTemp = []
    {for(let i = 0;i<ingredientsArray.length;i++){
        const ingredient = ingredientsArray[i]
        for(let j = 0;j<props.ingredients[ingredient];j++){
            transformedIngredientsTemp.push(ingredient)
        }
    }}
    let transformedIngredients = transformedIngredientsTemp.map((item,index)=>{
        return <BurgerIngredient key={item+index} type={item}/>
    })
    if (transformedIngredientsTemp.length===0){
        transformedIngredients = <p>Please start adding some ingredients</p>
    }
    return(
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default Burger