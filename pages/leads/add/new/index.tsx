import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "@/components/page-layout/PageLayout";
import LeadsForm from "@/components/forms/leads/LeadsForm";
import Card from "@mui/material/Card";

interface CreateLeadPageProps {}

const CreateLeadPage: FC<CreateLeadPageProps> = (): ReactElement => {
  return (
    <PageLayout>
      <PageContentWrapper title="newLead" center>
        <Box
          width={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            p: "20px",
            maxWidth: "900px",
          }}
        >
          <Card
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "24px",
              maxWidth: "900px",
              p: "24px 24px 36px",
            }}
          >
            <LeadsForm />
          </Card>
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

export default CreateLeadPage;
