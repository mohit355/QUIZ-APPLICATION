import "@/styles/globals.css";
import store from "../store";
import { Provider } from "react-redux";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Quiz App</title>
        <link rel="icon" href="/josh_Talk_Logo.png" sizes="any" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
