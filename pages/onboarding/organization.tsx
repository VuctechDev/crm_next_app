import React, { FC, ReactElement } from "react";
import OrganizationForm from "@/components/forms/organization/OrganizationForm";
import PageLayout from "@/components/page-layout/PageLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface OrganizationOnboardingPageProps {}

const OrganizationOnboardingPage: FC<
  OrganizationOnboardingPageProps
> = (): ReactElement => {
  return (
    <PageLayout publicPage>
      <OrganizationForm />
    </PageLayout>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
    revalidate: 60,
  };
}

export default OrganizationOnboardingPage;
