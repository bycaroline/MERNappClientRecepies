import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../css/styles.module.css'


export const UserItem = props => {
    return (
        <div className={styles.publicRecipeItem}>
            <li >
                <Link to={`/users/${props.id}`}>
                    <div >
                        <div >

                        </div>

                        <div className="user-item__info">
                            <h2>Name: {props.name}</h2>
                            <p>Number of recipes: {props.recipes}
                            </p>

                        </div>
                    </div>
                </Link>
            </li>
        </div>
    );
};


