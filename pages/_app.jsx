import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "../redux/store";
import { userSlice } from "../redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import Layout from "../components/Layout/Layout";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch(
          userSlice.actions.setUser({
            name: user.displayName,
            uid: user.uid,
          })
        );
      } else {
        store.dispatch(userSlice.actions.setUser(null));
      }
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
