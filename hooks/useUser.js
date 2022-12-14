import { useEffect, useState } from "react";
import { apiHttp } from "../utils/utils";

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await apiHttp.get("");
      setUser(re.data.data);
      setLoading(false);
    } catch (err) {
      console.log(`Fetch User Error =>`, err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading };
}
