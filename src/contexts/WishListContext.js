'use client';
import {useState, createContext, useContext, useEffect} from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

const WishListContext = createContext();

export const useWishList = () => {
    const context = useContext(WishListContext);
    if (context === undefined) {
        throw new Error("useWishList must be used within a WishListProvider");
    }
    return context;
};

export const WishListProvider = ({ children }) => {
    const { token } = useAuth();
    const [wishlist, setWishlist] = useState([]);

    // useEffect(() => {
    //     if (token) {
    //         fetchWishlist();
    //     } else {
    //         setWishlist([]);
    //     }
    // }, [token]);

    const fetchWishlist = async () => {
        try {
            // const response = await fetch("/api/user/wishlist", {
            //     headers: { Authorization: `Bearer ${token}` },
            // });
            // if (response.ok) {
            //     const data = await response.json();
            //     setWishlist(data.wishlist);
            // } else {
            //     console.error("Failed to fetch wishlist");
            // }

        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    const addToWishlist = async (product) => {
        // if (!token) {
        //     toast.error("You need to be logged in to add items to your wishlist.");
        //     return;
        // }
        try {
            // const response = await fetch("/api/user/wishlist", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${token}`,
            //     },
            //     body: JSON.stringify({ product }),
            // });
            // if (response.ok) {
            //     const data = await response.json();
            //     setWishlist(data.wishlist);
            //     toast.success("Product added to wishlist!");
            // } else {
            //     toast.error("Failed to add product to wishlist.");
            // }
            if (wishlist.find(item => item.id === product.id)) {
                toast.success("Product is already in wishlist!");
                return;
            }
            wishlist.push(product);
            toast.success("Product added to wishlist!");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const removeFromWishlist = async (productId) => {
        // if (!token) {
        //     toast.error("You need to be logged in to remove items from your wishlist.");
        //     return;
        // }
        try {
            // const response = await fetch(`/api/user/wishlist/${productId}`, {   
            //     method: "DELETE",
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // });
            // if (response.ok) {
            //     const data = await response.json();
            //     setWishlist(data.wishlist);
            //     toast.success("Product removed from wishlist!");
            // } else {
            //     toast.error("Failed to remove product from wishlist.");
            // }
            const newWishlist = wishlist.filter(item => item.id !== productId);
            setWishlist(newWishlist);
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <WishListContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist }}
        >
            {children}
        </WishListContext.Provider>
    );
};