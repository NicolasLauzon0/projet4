import { Handle } from 'reactflow'
import { useAuth } from '../../context/AuthContext'

const LoginAccueilNode = () => {
    const { signIn, logOut, user } = useAuth()
    return (
        <div className="log nodrag">
            <div className="logo">
                <h1>Logo</h1>
                <Handle type="source" position="bottom" id="a" />
            </div>
            <div className="login-text">

                <Handle type="target" position="top" id="a" />
                <button className="login-button">
                    {user === null ? "Login with Google" : "Logout"}
                </button>
            </div>
        </div>
    )
}

export default LoginAccueilNode