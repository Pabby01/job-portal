import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
