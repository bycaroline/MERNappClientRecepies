import React from 'react'
import RecipeItem from './RecipeItem'
import { Link } from 'react-router-dom'

const RecipeList = (props) => {

    if (props.items.length === 0) {
        return (
            <div>
                <h2>No recipes found</h2>
                <Link to='/dash/recipes/new'><p>Create recipe</p></Link>
            </div>
        )
    }

    return (
        <div>
            <ul>{
                props.items.map(recipe => (
                    <RecipeItem
                        key={recipe.id}
                        id={recipe.id}
                        image={recipe.image}
                        title={recipe.title}
                        description={recipe.description}
                        creatorId={recipe.creator}
                        creatorName={recipe.creatorName}
                        onDelete={props.onDeleteRecipe}
                        comments={recipe.comments}
                        url={recipe.url}
                    />

                ))}
            </ul>

        </div>
    )

}

export default RecipeList