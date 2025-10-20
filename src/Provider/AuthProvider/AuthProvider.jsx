import { useEffect, useState } from "react";
import { AuthContext } from "./authContext"; 
import Cookies from "js-cookie"; 


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reloadUser, setReloadUser]= useState(true)
    const [reload, setReload]= useState(false);

    const loadUserFromCookie = () => {
        const cookieUser = Cookies.get("user"); 
        if (cookieUser) {
            try {
                setUser(JSON.parse(cookieUser));
            } catch (error) {
                console.error("Failed to parse user from cookie:", error);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUserFromCookie();
    }, [reloadUser, reload]);

    const AuthInfo = { user, setUser, loading, setReloadUser, setReload, reload };

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
