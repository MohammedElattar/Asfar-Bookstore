import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useAdminContext } from "../../AdminContext";
import Loading from "../Loading";
import s from "./RequireAdmin.module.scss";
function RequireAdmin({ children, ...props }) {
  const [loading, setLoading] = useState(true);
  const { setData, setLoading: setAdminLoading } = useAdminContext();
  const { push } = useRouter();
  const fetchData = async () => {
    try {
      setAdminLoading(true);
      const res = await axios.post(props.url, undefined, {
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      });
      setData(res.data);
      setLoading(false);
      setAdminLoading(false);
    } catch (err) {
      console.log(`Error =>`, err.response);
      push("/admin/login");
    }
  };

  useEffect(() => {
    if (!props.url) return;
    fetchData();
  }, [JSON.stringify(props)]);

  return loading ? (
    <div className={s.loadingContainer}>
      <Loading size={60} borderWidth="4px" />
    </div>
  ) : (
    children
  );
}
export default RequireAdmin;
