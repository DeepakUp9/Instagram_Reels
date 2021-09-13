import React, { useState, useEffect } from "react";
import { firebaseAuth ,provider,firebaseDB} from "../config/firebase";
export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData,setUserData]=useState(null);

  function login(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  function loginWithGoogle(){

   
   return  firebaseAuth.signInWithPopup(provider);
}



  function signOut() {
    return firebaseAuth.signOut();
  }

  function signUp(email, password) {
    return firebaseAuth.createUserWithEmailAndPassword(email , password);
  }



  useEffect(() => {
    // event attach kra hai
    // logged In state => loggedOut state
    // loggedOut state => loggedIn state
    firebaseAuth.onAuthStateChanged( async (user) => {
      console.log("Inside auth state changed !!", user);

      setCurrentUser(user);


      if(user){
        let {displayName ,email,uid,photoURL} =user;
        

        let docRef = firebaseDB.collection("users").doc(uid)
       

       let documentSnapshot = await docRef.get()
      

     if(!documentSnapshot.exists){

    docRef.set({
      displayName,
      email,
      photoURL
    })
  }

  setCurrentUser(user);

  setUserData({displayName ,email,uid,photoURL});
    }
    else{
      setUserData(null);
    }

  
     
    });
  }, []);

  let value = {
    currentUser: currentUser,
    signOut: signOut,
    login: login,
    signUp: signUp,
    loginWithGoogle:loginWithGoogle,
    user:userData,
    

  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
