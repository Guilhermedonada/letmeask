import firebase from "firebase"
import { createContext, ReactNode, useEffect, useState } from "react"
import { auth } from "../services/firebase"

type User = {
  id: string,
  name: string,
  avatar: string
}

type AuthContextType = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext  = createContext({} as AuthContextType)

export function AuthContextProvider(props : AuthContextProviderProps) {
  
  const [user, setUser] = useState<User>()

  useEffect(() => {
    //no reload verifica no firebase dados do usuario
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const {displayName, photoURL, uid} = user
  
        if(!displayName || !photoURL){
          throw new Error('Missing information from google')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      
      }   

      //retorna isso para todo eventlistenner do useEffect, assim finaliza o effect ao sair da tela e nao corre o risco de ficar escutando a funcao e dando erro 
      return () => {
        unsubscribe()
      }
    })
  }, [])

  
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)
    
    if(result.user){
      const {displayName, photoURL, uid} = result.user

      if(!displayName || !photoURL){
        throw new Error('Missing information from google')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    
    }   
  }


  return(
    <AuthContext.Provider value={{user,signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}