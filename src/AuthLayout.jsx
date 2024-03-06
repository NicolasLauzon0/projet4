import React from 'react'
import Login from './components/Connexion/Login'
import { ReactFlowProvider } from 'reactflow'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className="interface auth">
            <main>
                <main style={{ width: "100%", height: "100vh" }}>
                    <ReactFlowProvider>
                        <Outlet />
                    </ReactFlowProvider>
                </main>
            </main>
        </div>
    )
}

export default AuthLayout