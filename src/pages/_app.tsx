import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReduxProvider } from "@/store/Provider";
import { TenantProvider } from "@/contexts/TenantContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <TenantProvider>
        <Component {...pageProps} />
      </TenantProvider>
    </ReduxProvider>
  );
}
