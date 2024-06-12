import PageLayout from "@/components/page-layout/PageLayout";
import QueryProvider from "@/components/providers/QueryProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "@/styles/globals.css";
import "@/styles/loader.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { SnackbarProvider } from "@/components/providers/SnackbarContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryProvider>
      {/* <AuthGuard> */}
      <ThemeProvider>
        <SnackbarProvider>
          {/* <PageLayout> */}
          <Component {...pageProps} />
          {/* </PageLayout> */}
        </SnackbarProvider>
      </ThemeProvider>
      {/* </AuthGuard> */}
    </QueryProvider>
  );
};

export default appWithTranslation(App);
