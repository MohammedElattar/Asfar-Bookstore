import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import "react-awesome-button/dist/styles.css";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import AdminProvider from "../context/AdminContext";
import AuthProvider from "../context/AuthContext";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>{pageProps.title ? <title>{pageProps.title}</title> : null}</Head>

      <AuthProvider>
        <AdminProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </AdminProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
