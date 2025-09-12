'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { signIn, getSession } from 'next-auth/react';


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
 
  return context;
};



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await getSession();
        if (session && session.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);
  

  const login = async (email, password) => {
    try {

      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });


      
      if (response.ok) {
        
        const session = await getSession(); 
        if (session.user) {
          setUser(session.user); // Optional: update your context or state
        }
        return true;
      } else {
        console.log("Login failed:", response.error);
        return false;
      }
    } catch (error) {
      console.log("Login error:", error);
      return false;
    }
  };

  const register = async (email, password, name)=> {
    try {
      const response = await fetch('/api/user/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            confirmPassword: password
          })
        });
      const data = await response.json();
      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
