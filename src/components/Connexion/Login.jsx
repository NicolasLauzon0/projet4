import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
    const { signIn, logOut, user } = useAuth()

    return (
        <button className="login-button" onClick={user === null ? signIn : logOut
        }>
            {user === null ? "Se connecter avec Google" : "Se déconnecter"}
        </button>
    )
}

export default Login