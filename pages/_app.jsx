import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "../app/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { userSlice } from "../app/userSlice";
import Layout from "../components/Layout/Layout";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      store.dispatch(userSlice.actions.setUser(user));
    });
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
