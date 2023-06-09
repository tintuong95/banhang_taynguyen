
import "../styles/tailwindcss.css"



import { Provider } from "react-redux";

import { store } from "../store/store.js";


function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  );
}

export default MyApp;
