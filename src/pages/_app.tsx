import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReduxProvider } from "@/store/Provider";
import { fontVariables } from "@/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <div className={`${fontVariables} font-root`}>
        <Component {...pageProps} />
      </div>
    </ReduxProvider>
  );
}
