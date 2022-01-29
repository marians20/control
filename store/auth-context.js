import React, { useState, useEffect, useCallback } from "react";
import jwtDecode from "jwt-decode";

const calculateRemainingTime = (exp) => {
    const currentTime = new Date().getTime();
    const expirationTime = new Date(exp * 1000).getTime();
    const remainingDuration = expirationTime - currentTime;
    return remainingDuration;
};
const AuthContext = React.createContext({
    token: "",
    email: "",
    isLoggedIn: false,
    login: (token, email) => { },
    logout: () => { },
});

let logoutTimer;

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    let isLoggedIn = false;

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        setEmail(localStorage.getItem("email"));
        isLoggedIn = !!storedToken;
    }, []);

    const loginHandler = (token, email) => {
        if(!token || !email) {
            return;
        }
        
        const decoded = jwtDecode(token);
        const remainingTime = calculateRemainingTime(decoded.exp);

        if (remainingTime < 3600) {
            logoutHandler();
        }

        setToken(token);
        setEmail(email);
        window !== 'undefined' && localStorage.setItem("token", token);
        window !== 'undefined' && localStorage.setItem("email", email);

        logoutTimer = setTimeout(() => {
            logoutHandler();
        }, remainingTime);
    };

    const logoutHandler = useCallback(() => {
        setToken(null);
        setEmail(null);
        window !== 'undefined' && localStorage.removeItem("token");
        window !== 'undefined' && localStorage.removeItem("email");
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    useEffect(() => {
        if (!token) {
            return;
        }
        const decoded = jwtDecode(token);
        const remainingTime = calculateRemainingTime(decoded.exp);
        console.log('AMR', remainingTime);
        logoutTimer = setTimeout(() => {
            logoutHandler();
        }, remainingTime);
    }, [token, logoutHandler]);

    const contextValue = {
        token,
        email,
        isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
