import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { apiHttp } from "../../../utils/utils";
import Loading from "../../Loading";
import s from "./RequireAdmin.module.scss";
function RequireAdmin({ children, ...props }) {
  const [loading, setLoading] = useState(true);
  const { setData, setLoading: setAdminLoading } = useAdminContext();
  const { push, query } = useRouter();
  const fetchData = async () => {
    try {
      setAdminLoading(true);

      console.log(`url => ${props.url}`);
      const res = await apiHttp.get(props.url);

      console.log(`Success =>`, res);
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
    // eslint-disable-next-line
  }, [props.url]);

  return loading ? (
    <div className={s.loadingContainer}>
      <Loading size={60} borderWidth="4px" />
    </div>
  ) : (
    children
  );
}
export default RequireAdmin;
