// import React, { createContext, useState } from "react";

// // Create Context
// export const UserContext = createContext();

// const UserProvider = ({ children }) => {

//   const [user, setUser] = useState(null);

//   // Update user information
//   const updateUser = (data) => {
//     setUser(data);
//   };

//   // Remove user information (for logout)
//   const clearUser = () => {
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         updateUser,
//         clearUser
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;