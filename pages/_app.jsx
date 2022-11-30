import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Layout from "../components/Layout/Layout";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
