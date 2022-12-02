import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import "react-awesome-button/dist/styles.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Layout from "../components/Layout/Layout";
import AdminProvider from "../context/AdminContext";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout {...pageProps}>
        {pageProps.admin ? (
          <AdminProvider>
            <Component {...pageProps} />
          </AdminProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </Provider>
  );
}

export default MyApp;
