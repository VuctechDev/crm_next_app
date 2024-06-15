import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import OrganizationForm from "@/components/forms/organization/OrganizationForm";
import PageLayout from "@/components/page-layout/PageLayout";
import Card from "@mui/material/Card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface OrganizationOnboardingPageProps {}

const OrganizationOnboardingPage: FC<
  OrganizationOnboardingPageProps
> = (): ReactElement => {
  return (
    <PageLayout hideLayout={true}>
      <Box
        width={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "98vh",
          p: "20px",
        }}
      >
        <Card
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "24px",
            maxWidth: "600px",
            p: "24px 24px 36px",
          }}
        >
          <OrganizationForm />
        </Card>
      </Box>
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
