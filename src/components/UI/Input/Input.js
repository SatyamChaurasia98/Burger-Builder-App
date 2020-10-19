import React from 'react'
import './Input.css'


const Input = (props)=>{
    let inputElement = null
    const inputClasses = ['InputElement']
    if(props.inValid && props.touched ){
        inputClasses.push('Invalid')
    }
    switch (props.elementtype) {
        case ('input'):
            inputElement = <input className={inputClasses.join(" ")} 
            {...props.elementconfig} 
            value={props.value}
            onChange={props.changed}/>
            break
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(" ")} 
            {...props.elementconfig} 
            value={props.value}
            onChange={props.changed}/>
            break
        case ('select'):
            inputElement = (<select 
            className={inputClasses.join(" ")} value={props.value} onChange={props.changed}>
                {props.elementconfig.options.map((optionElement,index)=>{
                    return(
                    <option key= {index} value={optionElement.value}>
                        {optionElement.displayValue}
                    </option>
                    )
                })}
            </select>)
            break
        default:
            inputElement = <input className={inputClasses.join(" ")} {...props.elementconfig} value={props.value}/>
    }

    return(
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input