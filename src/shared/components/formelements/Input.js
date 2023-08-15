import React, { useReducer, useEffect } from 'react'
import { validate } from '../../util/validators'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state;
    }
};


const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
    })

    // To not get inifinite loops pull out relevant pieces with object destructuring to put in the useEffect
    const { id, onInput } = props
    const { value, isValid } = inputState

    useEffect(() => {
        onInput(
            id,
            value,
            isValid
        )
    }, [id, onInput, value, isValid])

    //when user enters something
    const changeHandler = event => {
        // provide type and value as is required above
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        })
    }

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }

    const element = props.element === 'input' ? (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />)
        :
        (<textarea
            id={props.id}
            rows={props.rows || 3}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />)

    return (
        <div>

            <label htmlFor={props.id}>{props.label}</label>

            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}

        </div>
    )
}

export default Input