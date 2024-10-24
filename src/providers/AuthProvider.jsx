import { useEffect, useMemo, useState, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const updateToken = (newToken) => {
        setToken(newToken)
    }

    const deleteToken = () => {
        setToken(null)
    }

    const getUsuario = () => {
        axios.get(process.env.REACT_APP_API + "/auth/profile")
            .then((respuesta) => {
                setUsuario(respuesta.data);
                setIsLoading(false);
            })
            .catch(function (error) {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("token", token);
            getUsuario();
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            setUsuario(null);
        }
    }, [token])

    const Context = useMemo(() => {
        return {
            token,
            isLoading,
            usuario,
            updateToken,
            deleteToken
        }
    }, [token, usuario, isLoading])
    return <AuthContext.Provider value={Context}>{children}</AuthContext.Provider>

}

export const useAuth = () => {
    return useContext(AuthContext);
}