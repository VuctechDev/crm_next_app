import Head from "next/head";
import { Inter } from "next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "@/components/page-layout/PageLayout";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { useGetUser } from "@/lib/client/api/user/queries";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: user } = useGetUser();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <PageContentWrapper title={user?.organization?.name}><></></PageContentWrapper>
      </PageLayout>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
    revalidate: 60,
  };
}
