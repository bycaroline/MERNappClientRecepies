import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../shared/components/formelements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import styles from '../../css/styles.module.css'

const NewRecipe = () => {
    const auth = useContext(AuthContext)
    const { isLoading, sendRequest } = useHttpClient()


    const [fileData, setFileData] = useState();
    const [image, setFile] = useState('')

    const handleFileChange = ({ target }) => {
        setFileData(target.files[0])
        setFile(target.value)

        console.log(target.files[0])
    }
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            url: {
                value: '',
                isValid: false
            }
        },
        false
    )

    const navigate = useNavigate()

    const recipeAddHandler = async event => {
        event.preventDefault()
        try {
            const formData = new FormData();

            formData.append('title', formState.inputs.title.value)
            formData.append('description', formState.inputs.description.value)
            formData.append('creator', auth.userId)
            formData.append('image', fileData)

            await sendRequest(process.env.REACT_APP_BACKEND_URL + '/recipes',
                'POST',
                formData,
                { Authorization: 'Bearer ' + auth.token }
            )
            //otherwise body wont be read
            navigate('/')
        } catch (err) {
        }
    }

    return (
        <>
            <div className={styles.newRecipe}>
                <h1>New Recipe</h1>
                <div className={styles.newRecipeItem}>
                    <form
                        onSubmit={recipeAddHandler}
                    >
                        {isLoading && <LoadingSpinner asOverlay />}
                        <Input
                            id='title'
                            element='input'
                            type="text"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a title'
                            //function passed to the Input component
                            onInput={inputHandler}
                            placeholder='Title...'
                        />
                        <Input
                            id='description'
                            element='textarea'
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            errorText='Please enter a description'
                            //function passed to the Input component
                            onInput={inputHandler}
                            placeholder='Description'
                            rows="15"
                            cols="10"
                            wrap="hard"

                        />
                        <input
                            type="file"
                            value={image}
                            name='image'
                            accept='.jpg, .png, .png'
                            onChange={handleFileChange}
                            placeholder='upload image'
                        />

                        <button type='submit' disabled={!image && !formState.isValid}>Add recipe</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default NewRecipe




