import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAdminContext } from "../context/AdminContext";

function useAdminFetch(url) {
  const { isLoggedIn, user } = useAdminContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    const res = await axios.get(url);
    console.log(`response`, res);
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      fetchData();
    } else {
      router.push(`/admin/login`);
    }
    //eslint-disable-next-line
  }, [isLoggedIn, user]);

  return { loading, data };
}
export default useAdminFetch;
