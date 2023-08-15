import React, { useContext, useState } from 'react'
import { AuthContext } from '../../shared/context/auth-context'
import { Link } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'
import CommentForm from './CommentForm'
import styles from '../../css/styles.module.css'



export const AllRecipeItem = recipesWithUser => {

    const { sendRequest } = useHttpClient()
    const auth = useContext(AuthContext)
    const [showMore, setShowMore] = useState(false);
    const text = recipesWithUser.description

    const handleShow = () => {
        setShowMore(!showMore)
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const confirmDeleteHandler = async () => {
        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/${recipesWithUser.id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                })
            refreshPage()

        } catch { }
    }

    return (
        <li >
            <div >
                <div className={styles.publicRecipeItem}>
                    <h2>{recipesWithUser.title}</h2>

                    <img src={recipesWithUser.url} className={styles.imgPublic} alt='recipeImage' />

                    <div className={styles.optionsAllRecipe}>

                        {auth.userId === recipesWithUser.creatorId && (<Link to={`/recipes/${recipesWithUser.id}`} ><p>Edit Recipe</p></Link>)}
                        {auth.userId === recipesWithUser.creatorId && (<button onClick={confirmDeleteHandler}>Delete Recipe</button>)}
                    </div>

                    <div className={styles.textAllRecipeItem}>
                        <p className={styles.textByAllRecipeItem}>By: {recipesWithUser.creatorName}</p>
                        <p className={styles.textDescriptionAllRecipeItem}>
                            {showMore ? text : `${text.substring(0, 200)}`}
                            <button className="btn" onClick={handleShow}>{showMore ? '...show less' : '...show more'}</button>
                        </p>
                    </div>

                    <CommentForm recipeId={recipesWithUser.id} />

                    <div className={styles.allRecipeComments}>
                        <ul>
                            {recipesWithUser.comments.map(function (d, idx) {
                                return (
                                    <div>
                                        <ul>
                                            <li key={idx}>{d.text} {auth.userId === d.commentCreator && (<Link to={'/recipes/allcomments'} >...delete comment</Link>)}</li>
                                        </ul>
                                    </div>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>



        </li>
    )
}







