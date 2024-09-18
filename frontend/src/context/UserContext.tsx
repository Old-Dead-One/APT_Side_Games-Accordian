import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

interface UserContextType {
    user: any;
    login: (email: string, password: string) => void;
    signUp: (email: string, password: string, displayName: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
    cartItems: { eventSummary: any; sideGamesData: any }[];
    addToCart: (eventSummary: any, sideGamesData: any) => void;
    removeFromCart: (index: number) => void;
    isEventInCart: (event_id: number) => boolean;
    cartItemsCount: number;
    setCartItems: React.Dispatch<React.SetStateAction<{ eventSummary: any; sideGamesData: any }[]>>;
    updateUserEmail: (newEmail: string) => Promise<void>;
    updateUserPhone: (newPhone: string) => Promise<void>;
    updateUserdisplayName: (newDisplayName: string) => Promise<void>;
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

    // Fetch session on mount
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

    // Sync cart items with localStorage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // SignUp function
    const signUp = async (email: string, password: string, displayName: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { displayName },  // Save additional user data like displayName
            }
        });
        if (error) {
            console.error("Sign Up failed", error.message);
            alert(`Sign Up failed: ${error.message}`);
        } else if (data.user) {
            setUser(data.user);
            setIsLoggedIn(true);
            setCartItems([]);
            alert("Sign Up successful");
        }
    };

    // Login function
    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error("Login failed", error.message);
            alert(`Login failed: ${error.message}`);
        } else if (data.user) {
            setUser(data.user);
            setIsLoggedIn(true);
            setCartItems([]);
        }
    };

    // Logout function
    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout failed", error.message);
        } else {
            setUser(null);
            setIsLoggedIn(false);
            setCartItems([]);
        }
    };

    // Cart management
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

    // Update email
    const updateUserEmail = async (newEmail: string) => {
        const { data, error } = await supabase.auth.updateUser({ email: newEmail });
        if (error) {
            console.error("Error updating email:", error.message);
            alert(`Error updating email: ${error.message}`);
        } else {
            setUser(data.user);
        }
    };

    // Update phone
    const updateUserPhone = async (newPhone: string) => {
        const { data, error } = await supabase.auth.updateUser({ phone: newPhone });
        if (error) {
            console.error("Error updating phone:", error.message);
            alert(`Error updating phone: ${error.message}`);
        } else {
            setUser(data.user);
        }
    };

    // Update display name
    const updateUserdisplayName = async (newDisplayName: string) => {
        const { data, error } = await supabase.auth.updateUser({ data: { username: newDisplayName } });
        if (error) {
            console.error("Error updating display name:", error.message);
            alert(`Error updating display name: ${error.message}`);
        } else {
            setUser(data.user);
        }
    };

    console.log("UserContext", { user, isLoggedIn, cartItems });

    return (
        <UserContext.Provider value={{
            user,
            login,
            signUp,
            logout,
            isLoggedIn,
            cartItems,
            addToCart,
            removeFromCart,
            isEventInCart,
            cartItemsCount,
            setCartItems,
            updateUserEmail,
            updateUserPhone,
            updateUserdisplayName,
        }}>
            {children}
        </UserContext.Provider>
    );
};
