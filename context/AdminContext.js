import { createContext, useContext, useState } from "react";

const Context = createContext();

export default function AdminProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);
  console.log(user);
  return (
    <Context.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </Context.Provider>
  );
}

export const useAdminContext = () => useContext(Context);
