import React from 'react'
import './Order.css'

const Order = (props)=>{
    const newIngredients = []
    for (const key in props.ingredients) {
        newIngredients.push({name:key,amount:props.ingredients[key]})        
    }
    let finalIngredients = newIngredients.map((item,index)=>{
        return(
            <span style={{textTransform:'capitalize',display:'inline-block',margin:'0 8px', border:"1px solid #ccc",padding:'5px'}} key={index}>
                {item.name}({item.amount}) </span>
        )
    })
    return(
        <div className="Order">
            <p>Ingredients: {finalIngredients} </p>
    <p>Price: <strong>$ {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order