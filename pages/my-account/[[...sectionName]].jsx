import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Dashboard from "../../components/my-account/Dashboard/Dashboard";
import Downloads from "../../components/my-account/Downloads/Downloads";
import EditAccount from "../../components/my-account/EditAccount/EditAccount";
import EditAddress from "../../components/my-account/EditAddress/EditAddress";
import Orders from "../../components/my-account/Orders/Orders";
import PayMethods from "../../components/my-account/PayMethods/PayMethods";
import MyAccountNavigationBar from "../../components/MyAccountNavigationBar/MyAccountNavigationBar";
import s from "../../styles/my-account.module.scss";

function MyAccount() {
  const router = useRouter();
  const page = router.query.sectionName?.at(0);
  const user = useSelector((state) => state.user.user);
  let outlet = null;

  const signout = () => {
    router.reload();
  };

  if (user) {
    switch (page) {
      case "orders":
        outlet = <Orders />;
        break;
      case "downloads":
        outlet = <Downloads />;
        break;
      case "edit-address":
        outlet = <EditAddress />;
        break;
      case "payment-methods":
        outlet = <PayMethods />;
        break;
      case "edit-account":
        outlet = <EditAccount />;
        break;
      default:
        outlet = <Dashboard user={user} signout={signout} />;
    }
  } else if (typeof window !== "undefined") {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>حسابي - اسفار</title>
      </Head>

      <div className="py-5">
        <h1 className="title">حسابي</h1>
        <div className="container">
          <div className={`${s.wrapper} d-flex flex-column flex-lg-row`}>
            <MyAccountNavigationBar signout={signout} />
            <div className={s.outlet}>{outlet}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
