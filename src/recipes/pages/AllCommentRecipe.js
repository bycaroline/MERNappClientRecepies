import React, { useState, useEffect } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import CommentList from '../components/CommentList'
import styles from '../../css/styles.module.css'

const AllCommentRecipe = () => {
    const { sendRequest, isLoading } = useHttpClient()
    const [comments, setComments] = useState()

    useEffect(() => {

        const fetchComments = async () => {
            try {

                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/recipes/comments',
                )
                setComments(responseData.comments)
            } catch (err) {

            }
        }
        fetchComments()
    }, [sendRequest])



    return (
        <div className={styles.publicRecipeItem}>
            <h1>My comments</h1>

            {isLoading &&
                <div className='center'>
                    <LoadingSpinner />

                </div>}

            {!isLoading && comments && < CommentList
                items={comments}
            />}
        </div>

    )
}

export default AllCommentRecipe