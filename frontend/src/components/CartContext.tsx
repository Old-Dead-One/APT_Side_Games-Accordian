import React, { createContext, useState, useContext } from "react";

interface CartContextType {
    cartItems: { eventSummary: any, sideGamesData: any }[];
    addToCart: (eventSummary: any, sideGamesData: any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<{ eventSummary: any, sideGamesData: any }[]>([]);

    const addToCart = (eventSummary: any, sideGamesData: any) => {
        setCartItems(prevItems => [...prevItems, { eventSummary, sideGamesData }]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
