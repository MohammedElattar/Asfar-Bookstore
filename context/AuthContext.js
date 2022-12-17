import { createContext, useContext, useEffect, useState } from "react";
import Router from "next/router";
const Context = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await apiHttp.get(
          `${process.env.NEXT_PUBLIC_API_DOMAIN_PURE}/api/user`
        );
        console.log(`Get User Response =>`, res);
        if ("redirect_url" in res.data.data) {
          Router.push(res.data.data.redirect_url);
        } else if ("id" in res.data.data) {
          setUser(res.data.data);
        } else {
          console.log(`Unknown Response =>`, res);
        }
      } catch (err) {
        console.log(`Get User Error =>`, err);
      }
    })();
  }, []);
  useEffect(() => {
    console.log(`User =>`, user);
  }, [user]);
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
}

export const useAuthContext = () => useContext(Context);
