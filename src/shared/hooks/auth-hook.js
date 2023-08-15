import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

let logoutTimer;


export const useAuth = () => {
    const [token, setToken] = useState(false)
    const [tokenExpirationDate, setTokenExpirationDate] = useState()//not the same as in login
    const [userId, setUserId] = useState(false)
    const [name, setName] = useState(false)
    const navigate = useNavigate()

    const login = useCallback((uid, token, expirationDate) => {//either we already have expirationDate since login since has stored data. 
        setToken(token)
        setUserId(uid)
        setName(name)
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60) // or we do not and then generate new
        setTokenExpirationDate(tokenExpirationDate)
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                token: token,
                name: name,
                expiration: tokenExpirationDate.toISOString()
            }))//iso string can be converted back to date
        //empty array means never has to be recreated
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setTokenExpirationDate(null)
        localStorage.removeItem('userData')
        navigate('/')
    }, [])

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer)
        }
    }, [token, logout, tokenExpirationDate])//if token changes then use timer

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))//parse back to javascript
        if (storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()) {//expiration is still in the future and token valid
            login(storedData.userId, storedData.token, new Date(storedData.expiration))
        }
    }, [login])

    return { login, logout, token, userId, name }
}