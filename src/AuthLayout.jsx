import React from 'react'
import Login from './components/Connexion/Login'

const AuthLayout = () => {
    return (
        <div className="interface auth">
            <header>
                <h1>Connexion</h1>
            </header>
            <main>
                <div className="auth__container">
                    <Login />
                </div>
            </main>
        </div>
    )
}

export default AuthLayout