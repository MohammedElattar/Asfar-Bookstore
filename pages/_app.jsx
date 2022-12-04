import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import "react-awesome-button/dist/styles.css";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import AdminProvider from "../context/AdminContext";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>{pageProps.title ? <title>{pageProps.title}</title> : null}</Head>

      <AdminProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </AdminProvider>
    </>
  );
}

export default MyApp;
