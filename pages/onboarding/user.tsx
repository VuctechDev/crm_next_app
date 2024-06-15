import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import UserForm from "@/components/forms/user/UserForm";
import Card from "@mui/material/Card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "@/components/page-layout/PageLayout";

interface UserOnboardingPageProps {}

const UserOnboardingPage: FC<UserOnboardingPageProps> = (): ReactElement => {
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
          <UserForm />
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

export default UserOnboardingPage;
