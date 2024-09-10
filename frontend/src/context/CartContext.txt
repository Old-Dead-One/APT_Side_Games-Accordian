import React, { createContext, useState, useContext, useEffect } from "react";

interface CartContextType {
    cartItems: { eventSummary: any, sideGamesData: any }[];
    addToCart: (eventSummary: any, sideGamesData: any) => void;
    removeFromCart?: (index: number) => void;
    isEventInCart?: (event_id: number) => boolean;
    cartItemsCount?: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<{ eventSummary: any; sideGamesData: any }[]>(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

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
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isEventInCart, cartItemsCount }}>
            {children}
        </CartContext.Provider>
    );
};


