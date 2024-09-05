import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export interface AuthDepencies {
  currentUser: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn:  () => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthDepencies | undefined>(undefined);

const useAuth = () => {
  const context = useContext<AuthDepencies | undefined>(AuthContext);
  if  (!context) {
    throw new Error("AuthContext is undefined")
  }

  return context;
}

const AuthProvider:React.FC<{children: ReactNode}> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider); 
  }

  const logout = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    })

    return unsubscribe;
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, signUp, login, googleSignIn, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, useAuth};