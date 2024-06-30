import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "@/components/page-layout/PageLayout";
import "react-quill/dist/quill.snow.css";
import { useGetUser } from "@/lib/client/api/user/queries";
import NewEmail from "@/components/email/NewEmail";
import { useGetEmailConfig } from "@/lib/client/api/email/configs/queries";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import { useGetEmailSignature } from "@/lib/client/api/email/signature/queries";
import EmailForm from "@/components/forms/email/EmailForm";
import Card from "@mui/material/Card";

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
    <PageLayout>
      <PageContentWrapper title="newEmail" center>
        {/* <Card
          sx={(t) => ({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "24px",
            maxWidth: "900px",
            p: "24px 24px 36px",
            [t.breakpoints.down("sm")]: {
              rowGap: "20px",
            },
          })}
        > */}
        {/* <NewEmail from={from} /> */}
        <EmailForm from={from} />
        {/* </Card> */}
      </PageContentWrapper>
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
