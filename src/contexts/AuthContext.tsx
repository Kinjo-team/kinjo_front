import { ProviderProps, ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../auth/firebase';
import { User as FirebaseUser } from '@firebase/auth-types';

interface AuthContextProps {
    currentUser : FirebaseUser | null
    signup : (email : string, password : string) => any
    login : (email : string, password : string) => any
    logout : () => void
    resetPassword : (email : string) => any
    updateEmail : (email : string) => any
    updatePassword : (password : string) => any
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({children} : ProviderProps<ReactNode>) => {
    const [currentUser, setCurrentUser] = useState<null | FirebaseUser>(null);
    const [loading, setLoading] = useState<boolean>(true);

    function signup(email : string, password : string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function login(email : string, password : string) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    function logout() {
        return auth.signOut();
    }
    function resetPassword(email : string) {
        return auth.sendPasswordResetEmail(email);
    }
    function updateEmail(email : string) {
        return currentUser?.updateEmail(email);
    }
    function updatePassword(password : string) {
        return currentUser?.updatePassword(password);
    }

    useEffect(() => {

        const unsubscribe =  auth.onAuthStateChanged((user : any) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);


    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
