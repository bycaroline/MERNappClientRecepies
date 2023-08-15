import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../css/styles.module.css'

export const PublicRecipeItem = recipes => {
    const [showMore, setShowMore] = useState(false);
    const text = recipes.description

    return (
        <li >
            <div className={styles.publicRecipeItem}>
                <h2>{recipes.title}</h2>
                <img src={recipes.url} className={styles.imgPublic} alt='recipeImage' />
                <div className={styles.textPublicRecipeItem}>
                    <p>
                        {showMore ? text : `${text.substring(0, 80)}`}
                        <Link to="/auth">...show more</Link>
                    </p>
                </div>
            </div>
        </li >
    )
}


