import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../shared/components/formelements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'
import UpdateImage from './UpdateImage'
import styles from '../../css/styles.module.css'

const UpdateRecipe = () => {
    const auth = useContext(AuthContext)
    const recipeId = useParams().recipeId
    const { isLoading, sendRequest, error } = useHttpClient()
    const [loadedRecipe, setLoadedRecipe] = useState()
    const navigate = useNavigate()

    //from hooks
    const [formState, inputHandler, setFormData] = useForm({
        title:
        {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: ''
        }

    }, false)

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/${recipeId}`)

                setLoadedRecipe(responseData.recipe)
                setFormData({
                    title:
                    {
                        value: responseData.recipe.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.recipe.description,
                        isValid: true
                    }
                }, true)

            } catch (err) {

            }
        }
        fetchRecipe()
    }, [sendRequest, recipeId, setFormData])

    const recipeUpdateSubmitHandler = async event => {
        event.preventDefault()
        try {
            const formData = new FormData();

            formData.append('title', formState.inputs.title.value)
            formData.append('description', formState.inputs.description.value)

            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/${recipeId}`,
                'PATCH',
                formData,
                { Authorization: 'Bearer ' + auth.token }
            )

            //otherwise body wont be read
            navigate('/')
        } catch (err) {
        }
    }

    if (isLoading) {
        return <div>
            <LoadingSpinner asOverlay />
        </div>
    }

    if (!loadedRecipe && !error) {
        return <p>Recipe not found</p>
    }


    return (
        <div className={styles.newRecipe}>
            <h1>Edit Recipe</h1>
            <div className={styles.updateRecipeItem}>
                {!isLoading && loadedRecipe && (
                    <form onSubmit={recipeUpdateSubmitHandler}>
                        {isLoading && <LoadingSpinner asOverlay />}
                        <Input
                            id='title'
                            element='input'
                            type='text'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a title'
                            onInput={inputHandler}
                            initialValue={loadedRecipe.title}
                            initialValid={true}
                        />
                        <Input
                            id='description'
                            element='textarea'
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            errorText='Please enter a description'
                            onInput={inputHandler}
                            initialValue={loadedRecipe.description}
                            initialValid={true}
                            rows="15"
                            cols="10"
                        />
                        <div className={styles.imgUpdate}>
                            <img src={loadedRecipe.url} className={styles.imgUpdate} alt='recipeImage' />
                        </div>
                        <button type='submit' disabled={!formState.isValid}> Update recipe</button>

                    </form>)}
                <UpdateImage recipeId={recipeId} />
            </div>
        </div>
    )
}

export default UpdateRecipe


