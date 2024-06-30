import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "@/components/page-layout/PageLayout";
import { Card, Typography } from "@mui/material";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import { useTranslation } from "next-i18next";
import EmailConfigForm from "@/components/forms/email/config/EmailConfigForm";
import { useGetEmailConfig } from "@/lib/client/api/email/configs/queries";

interface EmailConfigPageProps {}

const EmailConfigPage: FC<EmailConfigPageProps> = (): ReactElement => {
  const { t } = useTranslation();
  const { data: config, isLoading } = useGetEmailConfig();

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  return (
    <PageLayout>
      <PageContentWrapper title="emailConfig" center>
        <Card
          sx={(t) => ({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "24px",
            maxWidth: "500px",
            p: "24px 24px 36px",
            [t.breakpoints.down("sm")]: {
              rowGap: "20px",
            },
          })}
        >
          {config ? (
            <Box display="flex">
              <Typography>
                {t("emailConfigured")}{" "}
                <Typography
                  color="info.main"
                  sx={{ ml: "5px", display: "inline" }}
                >
                  {config?.email}
                </Typography>
              </Typography>
            </Box>
          ) : (
            <EmailConfigForm />
          )}
        </Card>
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

export default EmailConfigPage;
