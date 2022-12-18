import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await apiHttp.get(process.env.NEXT_PUBLIC_CART);
      console.log(`Cart Response =>`, res);
      if (res.status === 200) {
        setCart(res.data.data);
      }
    } catch (err) {
      console.log(`Cart Error =>`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Context.Provider value={{ cart, setCart, reloadCart: fetchCart, loading }}>
      {children}
    </Context.Provider>
  );
}

export const useCartContext = () => useContext(Context);
