import { createContext, useContext } from "react";

// Create Context
export const UserContext = createContext();

// Custom Hook
export const useUser = () => useContext(UserContext);