import React from 'react'
import { useContext, useState } from 'react'
import { AuthContext } from '../shared/context/auth-context'
import styles from '../css/styles.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const DashHeader = () => {

    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')

    function refreshPage() {
        window.location.reload(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        navigate('/recipes/searchresult', { state: searchTerm })
        refreshPage()
    };

    return (
        <div className={styles.headerDash}>
            <p><Link to='/'>Home</Link></p>
            <p><Link to='/recipes/new'>New recipe</Link></p>
            <p><Link to='/users/all'>View Users</Link></p>
            <p><Link to={`/users/${auth.userId}`}>My profile</Link></p>

            <form onSubmit={handleSubmit}>
                <input
                    type="search"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)} // onChange will trigger "search post"
                    value={searchTerm}
                />
            </form>

            <div className={styles.headerDashLogout}>
                {auth.isLoggedIn && (<button onClick={auth.logout}>Logout</button>)
                }
            </div>

        </div >

    )
}

export default DashHeader