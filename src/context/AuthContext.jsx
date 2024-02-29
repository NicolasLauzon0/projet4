import { useContext, createContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, } from '../config/firebase';


const AuthContext = createContext({
    signIn: () => { },
    logOut: () => { },
    user: null,
    isConnected: false,
    loading: false
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    const signIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }
    const logOut = async () => {
        await signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,
            (currentUser) => {
                setUser(currentUser);
                setIsConnected(!!currentUser);
                setLoading(false);
            });
        return unsubscribe;
    }, []);


    return (
        <AuthContext.Provider value={{
            signIn,
            logOut,
            user,
            isConnected,
            loading
        }}>
            {children}
        </AuthContext.Provider>

    )

}


const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuth }