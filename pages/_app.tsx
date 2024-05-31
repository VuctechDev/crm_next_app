import PageLayout from "@/components/page-layout/PageLayout";
import QueryProvider from "@/components/providers/QueryProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default appWithTranslation(App);