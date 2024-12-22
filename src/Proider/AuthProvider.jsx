import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      const createUser = (email, password)=>{
            setLoading(true);
            return createUserWithEmailAndPassword(auth, email, password)
      }

      const loginUser =(email, password)=>{
            setLoading(true);
            return signInWithEmailAndPassword(auth, email, password)
      }

    const logOut =()=>{
      setLoading(true);
      return signOut(auth)
    }  

      // Observer
      useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
                  setUser(currentUser);
                  setLoading(false);
                  console.log('observer', currentUser)
            });

            return ()=>{
                  unSubscribe();
            }
      }, [])


      const authInfo ={
            user,
            loading,
            createUser,
            loginUser,
            logOut
      }


      return (
            <AuthContext.Provider value={authInfo}>
                  {children}
            </AuthContext.Provider>
      );
};

export default AuthProvider;