import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { createUserApi } from '../api/axios';
import { auth } from '../firebase';

const AuthContext = React.createContext();
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [show, setShow] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(true)
    const [cap, setCap] = useState(false)
    const [results, setResults] = useState([]);
    const [day, setDay] = useState(new Date());
    const [error, setError] = useState('');

    const signup = async ({ email, password, firstName, lastName, birthday, phoneNumber }) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const user = {
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
                email: email,
                uid: res.user.uid,
                phone: phoneNumber,
            }
            createUserApi(res._tokenResponse.idToken, user)
        } catch (error) {
            setError(error);
        }

    }
    //P@ssw0rd
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const logout = () => {
        signOut(auth)
        setCurrentUser('')
    }


    const resetPassord = (email) => sendPasswordResetEmail(auth, email)

    //P@ssw0rd

    const updatepassword = (password) => updatePassword(auth.currentUser, password)

    onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)
        setLoading(false)
    })


    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassord,
        updatepassword,
        show, setShow,
        cap, setCap,
        results, setResults,
        day, setDay,
        error, setError
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
