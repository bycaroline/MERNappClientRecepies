import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import Card from '../../shared/components/UIElements/Card'
import styles from '../../css/styles.module.css'

const RecipeItem = (props) => {

    const { sendRequest } = useHttpClient()
    const auth = useContext(AuthContext)

    const [showMore, setShowMore] = useState(false);
    const text = props.description

    const handleShow = () => {
        setShowMore(!showMore)
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const confirmDeleteHandler = async () => {
        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/${props.id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                })
            refreshPage()

        } catch { }

    }

    return (
        <div className={styles.myRecipes}>
            <li >
                <Card>
                    <div className={styles.publicRecipeItem}>
                        <div>
                            <h2>{props.title}</h2>
                            <div className={styles.imgPage}>
                                <img src={props.url} className={styles.imgPage} alt='recipeImage' />
                            </div>
                            <div className={styles.optionsAllRecipe}>
                                {auth.userId === props.creatorId && (<Link to={`/recipes/${props.id}`} ><p>Edit</p></Link>)}
                                {auth.userId === props.creatorId && (<button onClick={confirmDeleteHandler}>Delete</button>)}
                            </div>

                            <div className={styles.textAllRecipeItem}>
                                <p className={styles.textDescriptionAllRecipeItem}>
                                    {showMore ? text : `${text.substring(0, 200)}`}
                                    <button className="btn" onClick={handleShow}>{showMore ? '...show less' : '...show more'}</button>
                                </p>
                            </div>

                        </div>
                    </div>
                </Card>
            </li >
        </div>
    )
}

export default RecipeItem