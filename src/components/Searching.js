import React, { useState, useEffect } from 'react'
import { useHttpClient } from '../shared/hooks/http-hook'
import { useLocation } from 'react-router-dom'
import styles from '../css/styles.module.css'

export const Searching = () => {
    const { sendRequest } = useHttpClient()
    const [recipes, setRecipes] = useState([])

    const location = useLocation()
    const searchTerm = location.state

    useEffect(() => {
        const fetchSearchedRecipes = async () => {
            try {
                const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/searchfor?search=${searchTerm}`)
                setRecipes(data.data.recipes);
            }
            catch (err) {
            }
        }
        fetchSearchedRecipes()
    }, [sendRequest])

    return (
        <div>
            <div className={styles.myRecipes}>
                <h1>{!recipes.length ? 'No recipes found' : 'Found recipes:'}</h1>

            </div>

            <div className={styles.publicRecipeItem}>
                {recipes.map((recipe) => {
                    return (
                        <div key={recipe._id}>
                            <h2>{recipe.title}</h2>
                            <img src={recipe.url} className={styles.imgSearch} alt='' />
                            <p className={styles.textSearch}>{recipe.description}</p>

                        </div>
                    )
                })}
            </div >

        </div >
    )
}

