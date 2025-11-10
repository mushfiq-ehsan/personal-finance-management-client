
import { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);



  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };



  const logOut =()=>{
    return signOut(auth)
  }


  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password )
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    user,
    setUser,
    auth,
    createUser,
    logOut,
    signIn,
    loading,
    setLoading,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;