import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

interface UserContextType {
    user: any;
    login: (email: string, password: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
    cartItems: { eventSummary: any; sideGamesData: any }[];
    addToCart: (eventSummary: any, sideGamesData: any) => void;
    removeFromCart: (index: number) => void;
    isEventInCart: (event_id: number) => boolean;
    cartItemsCount: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<{ eventSummary: any; sideGamesData: any }[]>(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
                setIsLoggedIn(true);
            }
        };
        fetchSession();
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error("Login failed", error.message);
        } else if (data.user) {
            setUser(data.user);
            setIsLoggedIn(true);
        }
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout failed", error.message);
        } else {
            setUser(null);
            setIsLoggedIn(false);
            setCartItems([]); // Clear cart on logout
        }
    };

    const addToCart = (eventSummary: any, sideGamesData: any) => {
        setCartItems(prevItems => [...prevItems, { eventSummary, sideGamesData }]);
    };

    const removeFromCart = (index: number) => {
        setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const isEventInCart = (event_id: number) => {
        return cartItems.some(item => item.eventSummary.selectedEvent.event_id === event_id);
    };

    const cartItemsCount = cartItems.length;

    return (
        <UserContext.Provider value={{
            user,
            login,
            logout,
            isLoggedIn,
            cartItems,
            addToCart,
            removeFromCart,
            isEventInCart,
            cartItemsCount,
        }}>
            {children}
        </UserContext.Provider>
    );
};
