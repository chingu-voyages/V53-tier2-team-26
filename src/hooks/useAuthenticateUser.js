import {
    getAuth,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    browserSessionPersistence,
} from "@firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../data/firebase";
import { toast } from "react-toastify";

export default function useAuthenticateUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid);
                setSignedIn(true);
            } else {
                setSignedIn(false);
            }
        });
    }, [navigate]);

    function handleSignIn(e) {
        e.preventDefault();
        setError(false);
        const auth = getAuth(app);
        setPersistence(auth, browserSessionPersistence).then(() => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Successful sign-in
                    const user = userCredential.user;
                    console.log(user);
                    toast.success("Successfully signed in!", {
                        theme: "colored",
                    });
                    navigate("/");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, " - ", errorMessage);
                    setError(true);
                    setErrorMessage("Invalid username or password");
                });
        });
    }

    function handleUserAuthentication(isOpen, setIsOpen) {
        if (signedIn) {
            const auth = getAuth(app);
            signOut(auth).then(() => {
                toast.success("Successfully signed out!", {
                    theme: "colored",
                });
                setSignedIn(false);
            });
        } else {
            navigate("/Login");
        }

        isOpen && setIsOpen(false);
        return isOpen;
    }

    function handleResetPassword(e, email) {
        e.preventDefault();
        const auth = getAuth(app);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Check your email for a link to reset your password!");
                setPasswordResetSuccess(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, " - ", errorMessage);
            });
    }

    return {
        signedIn,
        handleSignIn,
        handleUserAuthentication,
        email,
        setEmail,
        password,
        setPassword,
        error,
        errorMessage,
        handleResetPassword,
        passwordResetSuccess,
    };
}
