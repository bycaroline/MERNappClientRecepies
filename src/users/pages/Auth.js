import React, { useState, useContext, Fragment } from 'react'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import Input from '../../shared/components/formelements/Input'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { Link } from 'react-router-dom'
import styles from '../../css/styles.module.css'


const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const { isLoading, sendRequest } = useHttpClient()


    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    )

    const switchModeHandler = () => {
        setIsLoginMode(prevMode => !prevMode)

    }

    const authSubmitHandler = async (event) => {
        event.preventDefault()


        if (isLoginMode) {
            try {

                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users/login', 'POST', JSON.stringify({
                    name: formState.inputs.name.value,
                    password: formState.inputs.password.value
                }),
                    {
                        'Content-Type': 'application/json'
                    }
                )
                auth.login(responseData.userId, responseData.token)
            } catch (err) {
            }

        } else {
            try {

                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users/signup',
                    'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                )

                auth.login(responseData.userId, responseData.token)
            }
            catch (err) {
            }
        }


    }

    return (
        <Fragment>

            <div className={styles.wrapper}>
                {isLoading && <LoadingSpinner asOverlay />}
                <div className={styles.headerSign} >
                    <h2>Login Required</h2>
                </div>
                <div className={styles.formSign}>
                    <form onSubmit={authSubmitHandler}>


                        <Input
                            id='name'
                            element='input'
                            type="text"
                            // label='Name'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter name'
                            //function passed to the Input component
                            onInput={inputHandler}
                            placeholder='Name'

                        />

                        <Input
                            // label='password'
                            type='password'
                            id='password'
                            element='input'
                            validators={[VALIDATOR_MINLENGTH(6)]}
                            onInput={inputHandler}
                            errorText='Enter over 5 characters'
                            placeholder='Password'
                        />
                        <button
                            type='submit'
                            disabled={!formState.isValid}>
                            {isLoginMode ? 'Login' : 'Signup'}
                        </button>

                    </form>
                    <button onClick={switchModeHandler}>
                        Go to {isLoginMode ? 'Signup' : 'Signin'}
                    </button>
                    <div>
                        <Link to={'/'}>
                            <p>Back to startpage</p>
                        </Link>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default Auth