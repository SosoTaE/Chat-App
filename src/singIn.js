import "./App.css"
import GoogleLogo from "./Google_Icons.webp"
import { useEffect, useState } from "react"
import { Link, } from "react-router-dom"
import {auth, provider} from "./firebase"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"


function SignIn() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const sing_in = () => {
        signInWithEmailAndPassword(auth, email,password)
        .then((userCredential) => {
            console.log(userCredential)
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    };

    const sing_in_with_google = () => {
        console.log("a")
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
        });
    }
    

    useEffect(() => {
        document.title = "Sing In"
    });


    return (
        <div className="login-div">
            <div className="title-to-create-account">Login</div>
            <div className="inputs_and_buttons">
                <div className="inputs-div">
                    <div className="input-div">
                        <input className="inputs-user-info" onChange={(text) => {setEmail(text.target.value)}} type="email" placeholder="Enter your email"></input>
                    </div>
                    <div className="input-div">
                        <input className="inputs-user-info" type="password"  onChange={(text) => {setPassword(text.target.value)}} placeholder="Enter your password"></input>
                    </div>
                </div>
            <div className="buttons-div">
                <div className="button-div" onClick={() => sing_in()}>
                    Sign In
                </div>
                <div className="button-google-div" onClick={() => sing_in_with_google()}>
                    <div className="google-logo-div">
                        <img src={GoogleLogo} className="google-logo" alt="jsx-a11y/alt-text" ></img>
                    </div>
                    <div className="button-title-div">Sing in with Google</div>
                </div>
            </div>
            <div className="title-to-open-sing-in-page">
                <p>Do not have an account?</p>
                <p>&nbsp;</p>
                <Link to="/Singup" style={{textDecoration:"none", color: "#45249b"}}>
                    Sing Up
                </Link>
            </div>
            </div>
        </div>
    )
}

export {SignIn}
