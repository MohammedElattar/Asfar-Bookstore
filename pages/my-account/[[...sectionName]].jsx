import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Dashboard from "../../components/MyAccount/Dashboard/Dashboard";
import Downloads from "../../components/MyAccount/Downloads/Downloads";
import EditAccount from "../../components/MyAccount/EditAccount/EditAccount";
import EditAddress from "../../components/MyAccount/EditAddress/EditAddress";
import Orders from "../../components/MyAccount/Orders/Orders";
import PayMethods from "../../components/MyAccount/PayMethods/PayMethods";
import MyAccountNavigationBar from "../../components/MyAccountNavigationBar/MyAccountNavigationBar";
import s from "../../styles/my-account.module.scss";

function MyAccount() {
  const router = useRouter();
  const page = router.query.sectionName?.at(0);
  let outlet = null;

  const signout = () => {
    router.reload();
  };

  if (true) {
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
        outlet = <Dashboard user={null} signout={signout} />;
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
