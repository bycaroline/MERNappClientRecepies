import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import styles from '../../css/styles.module.css'

const CommentItem = comments => {

    const { sendRequest } = useHttpClient()
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const confirmDeleteHandlerComment = async () => {
        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/comments/${comments.id}`,
                'DELETE',
                null,

                {
                    Authorization: 'Bearer ' + auth.token
                })

            navigate('/allcomments')

        } catch { }
    }

    return (
        <li >
            <div className={styles.myComments} >
                {auth.userId === comments.commentCreatorId && (<ul>
                    <li><h2>Title of recipe: {comments.recipeCommentTitle}</h2></li>
                    <li><p> My comment: {comments.text} </p></li></ul>)}
                {auth.userId === comments.commentCreatorId && (<button onClick={confirmDeleteHandlerComment} >delete comment</button>)}
            </div>
        </li >
    )
}

export default CommentItem