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

interface AddLeadsProps {}

const AddLeadsPage: FC<AddLeadsProps> = (): ReactElement => {
  const { data: user } = useGetUser();
  const { data: emailConfig, isLoading } = useGetEmailConfig();

  let from = `${user?.firstName} ${user?.lastName}`;
  if (emailConfig) {
    from += ` <${emailConfig?.email}>`;
  } else {
    from += ` <${process.env.NEXT_PUBLIC_EMAIL_USER}>`;
  }

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  return (
    <PageLayout>
      <PageContentWrapper title="newEmail">
        <Box
          width={1}
          sx={(t) => ({
            display: "flex",
            minHeight: "600px",
            justifyContent: "center",
            alignItems: "center",
            [t.breakpoints.down("sm")]: {
              flexDirection: "column",
              justifyContent: "flex-start",
              rowGap: "24px",
            },
          })}
        >
          <NewEmail from={from} />
        </Box>
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
