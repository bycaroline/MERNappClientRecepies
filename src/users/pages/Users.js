import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { UsersList } from '../components/UsersList'
import { useHttpClient } from '../../shared/hooks/http-hook'
import styles from '../../css/styles.module.css'

export const Users = () => {
    const [loadedUsers, setLoadedUsers] = useState()
    const { isLoading, sendRequest } = useHttpClient()

    //useeffct only runs when certain dependencies changes. 
    //if [] is emtpy it will never rerun, only run once
    //use Effect is not meant to turn into async, instead use another function inside
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                //fetch is default GET request. 
                //sendRequest only needs url as it was set up
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/users')

                setLoadedUsers(responseData.users) // is an array in backend

            } catch (err) {
            }
        }
        fetchUsers()
    }, [sendRequest])//sendRequest is a dependencie


    return (
        <>
            <div className={styles.allUsers}>
                <h1>All Users</h1>
                {isLoading &&
                    <div className='center'>
                        <LoadingSpinner />

                    </div>}
                {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
            </div>
        </>
    )
}
