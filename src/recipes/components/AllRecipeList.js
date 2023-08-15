import React from 'react'
import { AllRecipeItem } from './AllRecipeItem';

export const AllRecipeList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No recipes found.</h2>
            </div>
        );
    }

    return (
        <div>
            <ul>
                {props.items.map(recipe => (
                    <AllRecipeItem
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title}
                        description={recipe.description}
                        creatorName={recipe.creator.name}
                        creatorId={recipe.creator.id}
                        comments={recipe.comments}
                        commentCreator={recipe.comments.commentCreator}
                        url={recipe.url}
                    />
                ))}
            </ul>
        </div >

    );
};

