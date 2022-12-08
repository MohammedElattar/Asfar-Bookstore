import { createContext, useContext, useState } from "react";

const Context = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
}

export const useAuthContext = () => useContext(Context);
