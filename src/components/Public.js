import { Link } from 'react-router-dom'
import PublicRecipes from '../recipes/pages/PublicRecipes'
import styles from '../css/styles.module.css'

const Public = () => {

    const content = (
        <section className={styles.wrapper}>
            <header className={styles.headerPublic}>
                <div className={styles.headerPublicLogo}>
                    <h1>Family Recipes</h1>
                </div>
                <div className={styles.headerPublicSignin}>
                    <Link to="/auth"><p>Log in / Sign up</p></Link>
                </div>
            </header>
            <main className={styles.publicMain}>
                <PublicRecipes />
            </main>

            <footer>

            </footer>
        </section>

    )
    return content
}
export default Public