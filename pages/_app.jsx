import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import "react-awesome-button/dist/styles.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import AdminProvider from "../AdminContext";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>{pageProps.title ? <title>{pageProps.title}</title> : null}</Head>
      <Provider store={store}>
        <AdminProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </AdminProvider>
      </Provider>
    </>
  );
}

export default MyApp;
