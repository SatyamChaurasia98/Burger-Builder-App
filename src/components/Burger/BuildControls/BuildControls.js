import React from 'react'
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label:"Salad",type:"salad"},
    {label:"Bacon",type:"bacon"},
    {label:"Cheese",type:"cheese"},
    {label:"Meat",type:"meat"},
]

const BuildControls = (props)=>{
    return(
        <div className="BuildControls">
            <h4>Current price: <strong>${props.price.toFixed(2)}</strong></h4>
            {controls.map((ctrl,index)=>{
                return(
                    <BuildControl 
                    key={index} 
                    label={ctrl.label}
                    added = {()=>props.ingredientAdded(ctrl.type)}
                    removed = {()=>props.ingredientRemoved(ctrl.type)}
                    disabled = {props.disabled[ctrl.type]}
                    />
                )
            })}
            <button 
            className="OrderButton" 
            disabled={!props.purchaseable}
            onClick={props.ordered}>{props.isAuth?"ORDER NOW":"SIGIN TO CONTINUE"}</button>
        </div>
    )
}

export default BuildControls