import { ProviderProps, ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../auth/firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { User as FirebaseUser } from '@firebase/auth-types';

interface AuthContextProps {
    currentUser : FirebaseUser | null
    signup : (email : any, password : any) => any
    login : (email : any, password : any) => any
    logout : () => void
    resetPassword : (email : any) => any
    updateEmail : (email : any) => any
    updatePassword : (password : any) => any
    signInWithGoogle : () => any
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function useAuth() {
    return useContext(AuthContext);
}

const provider = new GoogleAuthProvider();


export const AuthProvider = ({children} : ProviderProps<ReactNode>) => {
    const [currentUser, setCurrentUser] = useState<null | FirebaseUser>(null);
    const [loading, setLoading] = useState<boolean>(true);

    function signup(email : any, password : any) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function login(email : any, password : any) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    function logout() {
        return auth.signOut();
    }
    function resetPassword(email : any) {
        return auth.sendPasswordResetEmail(email);
    }
    function updateEmail(email : any) {
        return currentUser?.updateEmail(email);
    }
    function updatePassword(password : any) {
        return currentUser?.updatePassword(password);
    }
    function signInWithGoogle() {
        return auth.signInWithPopup(provider);
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
        updatePassword,
        signInWithGoogle
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
