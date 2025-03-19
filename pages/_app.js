import "../styles/globals.scss";
import Head from "next/head";
import theme from "../theme/theme";
import { ThemeProvider } from "@mui/material";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no"
          />
          <title>Show Movies</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/logo/apple-touch-icon.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/logo/favicon-32x32.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/logo/favicon-16x16.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/logo/android-chrome-192x192.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/logo/android-chrome-512x512.png"
          ></link>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
