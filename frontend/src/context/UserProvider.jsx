import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (data) => {
    setUser(data);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};