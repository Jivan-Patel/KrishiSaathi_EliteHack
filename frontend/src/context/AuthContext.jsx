import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('ks_user');
        const storedRole = localStorage.getItem('ks_role');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                setRole(storedRole);
            } catch {
                localStorage.removeItem('ks_user');
                localStorage.removeItem('ks_role');
            }
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        setRole(userData.role);
        localStorage.setItem('ks_user', JSON.stringify(userData));
        localStorage.setItem('ks_role', userData.role);
    };

    const logout = () => {
        setUser(null);
        setRole(null);
        localStorage.removeItem('ks_user');
        localStorage.removeItem('ks_role');
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
