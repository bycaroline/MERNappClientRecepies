import { useCallback, useReducer } from 'react'

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true
            //then go trough and check if all are valid with loop
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            }
        case 'SET_DATA':
            //replace old data 
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            }

        default:
            return state
    }
}


export const useForm = (initialInputs, initialFormValidity) => {

    //the useReducer function
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    })

    //useCallback makes sure no infinite loop by defining dependies of that function of which it should re-render
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            //type, value, is Valid and input Id are actions
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        })
    }, [])

    //callback beacuse then stored by react and not called unnecessarily.
    //The dispatch function that lets you update the state to a different value and trigger a re-render.
    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        })
    }, [])

    return [formState, inputHandler, setFormData]
}