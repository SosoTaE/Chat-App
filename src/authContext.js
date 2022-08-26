import { createContext, useEffect, useState } from "react";
import {auth,db} from "./firebase";
import { onAuthStateChanged } from "firebase/auth"
import { useLocation, useNavigate } from "react-router-dom";
import { setDoc, doc,collection, addDoc, } from "firebase/firestore"


export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [loading, setLoading] = useState(true)
  const [user_data, setUser_data] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const add_user = async (object) => {
    console.log("asd")
    await setDoc(doc(db,"users", object.uid), object)
}
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid; 
        setUser_data(user)
        setLoading(false)
        console.log(user,":asd")
        const user_variable = user;
        const object =  {
            displayName: user_variable.displayName,
            email: user_variable.email,
            phoneNumber: user_variable.phoneNumber,
            photoURL: user_variable.photoURL,
            uid: user_variable.uid
        }
        add_user(object)
      }
      if (user && location.pathname !== "/chat") {
        navigate("/chat")
        
      } 
      else if (!user && location.pathname === "/chat") {
        navigate("/Singin")
      }
      else {
        // window.history.back()
      }
    }, [navigate]);
  })

  const value = user_data
    return (
        <UserContext.Provider value={value}>
          {children}
        </UserContext.Provider>
    );
}