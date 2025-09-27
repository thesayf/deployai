import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReduxProvider } from "@/store/Provider";
import { TenantProvider } from "@/contexts/TenantContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <TenantProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </TenantProvider>
    </ReduxProvider>
  );
}
