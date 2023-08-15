import React, { useState, useContext } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { useNavigate } from 'react-router-dom'
import styles from '../../css/styles.module.css'
import { AuthContext } from '../../shared/context/auth-context'


function UpdateImage({ recipeId }) {

    const { sendRequest } = useHttpClient()
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [fileData, setFileData] = useState();
    const [image, setFile] = useState('')

    const handleFileChange = ({ target }) => {
        setFileData(target.files[0])
        setFile(target.value)

        console.log(target.files[0])
    }

    const imageUpdateHandler = async event => {
        event.preventDefault()
        try {
            const formData = new FormData();

            formData.append('image', fileData)

            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/${recipeId}/image`,
                'PATCH',
                formData,
                { Authorization: 'Bearer ' + auth.token }
            )
            navigate('/')
        } catch (err) {
        }
    }

    return (
        <div className={styles.updateImage}>
            <form onSubmit={imageUpdateHandler}>
                <p>Change Image:</p>
                <input
                    type="file"
                    value={image}
                    name='image'
                    accept='.jpg, .png, .png'
                    label='Change image'
                    onChange={handleFileChange}
                    placeholder='upload image'
                />
                <button type='submit' disabled={!image} > Update image</button>
            </form>
        </div>
    )
}

export default UpdateImage