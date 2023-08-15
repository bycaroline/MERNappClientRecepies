import React, { useState, useEffect } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { PublicRecipeList } from '../components/PublicRecipeList'
import styles from '../../css/styles.module.css'

const PublicRecipes = () => {
    const { sendRequest, isLoading } = useHttpClient()
    const [loadedRecipes, setLoadedRecipes] = useState()

    useEffect(() => {
        const fetchRecipes = async () => {
            try {

                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/recipes/public')

                setLoadedRecipes(responseData.recipes)

            } catch (err) {

            }
        }
        fetchRecipes()
    }, [sendRequest])



    return (
        <div className={styles.publicRecipes}>

            {isLoading &&
                <div className='center'>
                    <LoadingSpinner />

                </div>}
            {!isLoading && loadedRecipes && <PublicRecipeList items={loadedRecipes} />}

        </div>

    )
}

export default PublicRecipes