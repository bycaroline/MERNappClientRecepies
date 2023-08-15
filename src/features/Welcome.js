import React from 'react'
import AllRecipes from "../recipes/pages/AllRecipes"
import { AuthContext } from "../shared/context/auth-context"

const Welcome = () => {

    const content = (
        <section>
            <AllRecipes />
        </section >
    )
    return content
}

export default Welcome