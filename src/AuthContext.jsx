import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  // TODO: signup

  const signup = async (username) => {
    try {
      const body = { username };
      const result = await fetch(API + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const token = await result.json();
      setToken(token);
      console.log(token);
      setLocation("TABLET");
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: authenticate
  const authenticate = async () => {
    if (!token) {
      console.error("No token available for authentication");
    }
    else {
      try {
        const result = await fetch(API + "/authenticate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.token}`
            }
          }
        );
        if (result.ok) {
          setLocation("TUNNEL");
        }
      } catch (error) {
        console.error("request failed", error);
      }
    }
  };

  const value = { location, signup, token, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
