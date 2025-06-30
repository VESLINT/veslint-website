import React, { useState, useEffect, useContext, createContext, FC } from 'react';
import { auth } from '../firebase-config';
import { User, onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

/**
 * Enhanced Auth Provider with Crystal Intelligence styling
 * Preserves all Firebase authentication logic while improving UX
 */
export const AuthProvider: FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Preserve original Firebase auth state listener logic
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        
        return unsubscribe;
    }, []);

    const value = {
        user,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook for accessing authentication context
 * Maintains exact same interface as original implementation
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;
};