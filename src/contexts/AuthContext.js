import React, { useContext, useState, useEffect } from 'react'

import { auth } from '../db/Firebase'


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function userLogin(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function adminLogin(email, password) {
        return auth.signInWithEmailAndPassword("admin@admin.com", "admxPSJD123#")
    }

    function logout() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = { signup, userLogin, adminLogin, currentUser, logout }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
