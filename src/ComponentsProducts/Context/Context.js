import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext();  

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(Cookies.get("authToken") || null);
    const [userRole, setUserRole] = useState(Cookies.get("userRole") || null)
    const [nameUser, setNameUser] = useState(Cookies.get("nameUser") || null)
    const [priceTotal, setPriceTotal] = useState(Cookies.get("priceTotal") || "")
    const [lengths, setLengths] = useState(Cookies.get("lengths") || "")
    const linkProxy = "https://cors-anywhere.herokuapp.com/"

    const login = (token, roles) => {
        Cookies.set("authToken", token, { expires: 36500, secure: true, sameSite: 'Strict' });
        Cookies.set("userRole", roles, { expires: 36500, secure: true, sameSite: 'Strict' });
        setAuthToken(token);
        setUserRole(roles)
    };

    const saveName = (nameUser) => {
        Cookies.set("nameUser", nameUser, { expires: 36500, secure: true, sameSite: 'Strict' });
        setNameUser(nameUser);
    }
    const savePrice = (length, priceTotal) => {
        Cookies.set("lengths", length, { expires: 36500, secure: true, sameSite: 'Strict' });
        Cookies.set("priceTotal", String(priceTotal), { expires: 36500, secure: true, sameSite: 'Strict' });
        setLengths(length)
        setPriceTotal(priceTotal)
    }
    const logout = () => {
        Cookies.remove("authToken")
        Cookies.remove("userRole")
        Cookies.remove("nameUser")
        Cookies.remove("lengths")
        Cookies.remove("priceTotal")
        setAuthToken(null);
        setUserRole(null);
        setNameUser(null);
        setLengths("");
        setPriceTotal("")
    };





    return (
        <AuthContext.Provider value={{
            authToken, 
            logout, 
            saveName,
            login, 
            setAuthToken, 
            setUserRole, 
            setNameUser,
            savePrice,
            userRole,
            nameUser,
            lengths,
            priceTotal,
            linkProxy
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 
