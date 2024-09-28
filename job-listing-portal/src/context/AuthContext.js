import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated (e.g., check token in localStorage)
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.token) {
            // Optionally verify the token here (make an API call to validate)
            // Uncomment and implement token verification if needed
            // const verifyToken = async () => {
            //     const response = await fetch('/api/verify-token', {
            //         method: 'POST',
            //         headers: { 'Authorization': `Bearer ${user.token}` }
            //     });
            //     const data = await response.json();
            //     if (data.isValid) {
            //         setUser({ user });
            //     } else {
            //         setUser(null);
            //     }
            // };
            // verifyToken();
            setUser({ user });
            console.log(user, '=============================')
        }
        setLoading(false);
    }, []); // Run effect only once on mount

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove token
        // localStorage.removeItem('token'); // Remove token
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    console.log('context:::::::::::', context);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
