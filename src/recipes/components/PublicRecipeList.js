import React from 'react'
import { PublicRecipeItem } from './PublicRecipeItem';

export const PublicRecipeList = recipes => {
    if (recipes.items.length === 0) {
        return (
            <div className="center">
                <h2>No recipes found.</h2>
            </div>
        );
    }

    return (
        <ul>
            {recipes.items.map(recipes => (
                <PublicRecipeItem
                    key={recipes.id}
                    id={recipes.id}
                    title={recipes.title}
                    description={recipes.description}
                    name={recipes.name}
                    creatorId={recipes.creator}
                    url={recipes.url}
                />
            ))}
        </ul>


    );
};

