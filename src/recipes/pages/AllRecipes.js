import React, { useState, useEffect } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AllRecipeList } from '../components/AllRecipeList'

const AllRecipes = () => {
    const { sendRequest, isLoading } = useHttpClient()
    const [loadedRecipes, setLoadedRecipes] = useState()

    useEffect(() => {

        const fetchRecipes = async () => {
            try {

                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/recipes',
                )

                setLoadedRecipes(responseData.recipesWithUser)
            } catch (err) {

            }
        }
        fetchRecipes()
    }, [sendRequest])


    return (
        <div>

            {isLoading &&
                <div className='center'>
                    <LoadingSpinner />

                </div>}

            {!isLoading && loadedRecipes && < AllRecipeList
                items={loadedRecipes}
            />}

        </div>

    )
}

export default AllRecipes