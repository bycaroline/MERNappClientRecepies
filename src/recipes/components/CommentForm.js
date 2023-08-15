import React, { useContext } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import { useForm } from '../../shared/hooks/form-hook'
import { VALIDATOR_REQUIRE } from '../../shared/util/validators'
import Input from '../../shared/components/formelements/Input'
import styles from '../../css/styles.module.css'

function CommentForm({ recipeId }) {
    const auth = useContext(AuthContext)
    const { sendRequest } = useHttpClient()

    const [formState, inputHandler] = useForm(
        {
            text: {
                value: '',
                isValid: false
            }
        },
        false
    )

    function refreshPage() {
        window.location.reload(false);
    }

    const commentAddHandler = async event => {
        event.preventDefault()
        try {

            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/${recipeId}/comments`,
                'POST',

                JSON.stringify({
                    text: formState.inputs.text.value,
                    recipeId: recipeId
                }),
                {

                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            )
            refreshPage()

        } catch (err) {
        }
    }

    return (
        <div className={styles.commentForm}>
            <form onSubmit={commentAddHandler}>
                <Input
                    id='text'
                    element='input'
                    type="text"
                    validators={[VALIDATOR_REQUIRE()]}
                    //function passed to the Input component
                    onInput={inputHandler}
                    placeholder='Write a comment...'
                />
                {/* <button type='submit' disabled={!formState.isValid}>Add comment</button> */}
            </form>
        </div>
    )
}

export default CommentForm