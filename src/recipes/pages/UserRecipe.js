import React, { useEffect, useState } from 'react'
import RecipeList from '../components/RecipeList'
import { useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import styles from '../../css/styles.module.css'

const UserRecipe = () => {
    const { sendRequest, isLoading } = useHttpClient()
    const userId = useParams().userId
    const [loadedRecipes, setLoadedRecipes] = useState()


    useEffect(() => {

        const fetchRecipes = async () => {
            try {

                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/user/${userId}`)

                setLoadedRecipes(responseData.recipes)//is what is returned in backend

            } catch (err) {

            }
        }
        fetchRecipes()
    }, [sendRequest, userId])




    return (

        <div className={styles.myRecipes}>
            {isLoading && <LoadingSpinner />}
            <h1>My Recipes</h1>

            {!isLoading && loadedRecipes && < RecipeList items={loadedRecipes} />}

        </div>
    )
}

export default UserRecipe