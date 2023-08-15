import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import { useLocation } from 'react-router-dom'
import styles from '../css/styles.module.css'

const DashLayout = () => {

    const location = useLocation()

    return (
        <>
            <div className={styles.wrapper}>
                {/* header for all the protected routes */}
                <DashHeader />
                <div>
                    {/* all the children in outlet */}
                    <Outlet />
                </div>
                {location.pathname !== '/' && <DashFooter />}
            </div>
        </>
    )
}
export default DashLayout