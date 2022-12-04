import { createContext, useContext, useState } from "react";

const Context = createContext();

export default function AdminProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <Context.Provider value={{ data, setData, loading, setLoading }}>
      {children}
    </Context.Provider>
  );
}

export const useAdminContext = () => useContext(Context);
