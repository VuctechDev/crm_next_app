import QueryProvider from "@/components/providers/QueryProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "@/styles/globals.css";
import "@/styles/loader.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { SnackbarProvider } from "@/components/providers/SnackbarContext";
import AuthRouteGuard from "@/components/providers/guards/AuthRouteGuard";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryProvider>
      <AuthRouteGuard>
        <ThemeProvider>
          <SnackbarProvider>
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </AuthRouteGuard>
    </QueryProvider>
  );
};

export default appWithTranslation(App);
