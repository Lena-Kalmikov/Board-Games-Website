import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = () => {
    // Implement your login logic here
    // Set isLoggedIn, user, and token accordingly
    console.log("logged in");
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Implement your logout logic here
    console.log("logged out");
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
  };

  const contextValue = {
    isLoggedIn,
    user,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
