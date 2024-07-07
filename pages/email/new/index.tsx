import React, { FC, ReactElement } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "@/components/page-layout/PageLayout";
import { useGetUser } from "@/lib/client/api/user/queries";
import { useGetEmailConfig } from "@/lib/client/api/email/configs/queries";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import { useGetEmailSignature } from "@/lib/client/api/email/signature/queries";
import EmailForm from "@/components/forms/email/EmailForm";

interface AddLeadsProps {}

const AddLeadsPage: FC<AddLeadsProps> = (): ReactElement => {
  const { data: user } = useGetUser();
  const { data: emailConfig, isLoading: isConfigLoading } = useGetEmailConfig();
  const { isLoading: isSignatureLoading } = useGetEmailSignature();

  let from = `${user?.firstName} ${user?.lastName}`;
  if (emailConfig) {
    from += ` <${emailConfig?.email}>`;
  } else {
    from += ` <${process.env.NEXT_PUBLIC_EMAIL_USER}>`;
  }

  if (isSignatureLoading || isConfigLoading) {
    return <LoadingOverlayer />;
  }

  return (
    <PageLayout title="newEmail" center>
      <EmailForm from={from} />
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

export default AddLeadsPage;
