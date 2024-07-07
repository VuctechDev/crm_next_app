import React, { FC, ReactElement } from "react";
import UserForm from "@/components/forms/user/UserForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "@/components/page-layout/PageLayout";

interface UserOnboardingPageProps {}

const UserOnboardingPage: FC<UserOnboardingPageProps> = (): ReactElement => {
  return (
    <PageLayout publicPage>
      <UserForm />
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

export default UserOnboardingPage;
