import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import "react-awesome-button/dist/styles.css";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import AdminProvider from "../context/AdminContext";
import AuthProvider from "../context/AuthContext";
import CartProvider from "../context/CartContext";
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {pageProps.title ? (
        <Head>
          <title>{pageProps.title}</title>
        </Head>
      ) : null}

      <AuthProvider>
        <AdminProvider>
          <CartProvider>
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </AdminProvider>
      </AuthProvider>
    </>
  );
}
