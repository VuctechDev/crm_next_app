import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getSearchQuery } from "@/lib/client/getSearchQuery";

interface RegisterConfirmationProps {}

const RegisterConfirmation: FC<
  RegisterConfirmationProps
> = (): ReactElement => {
  const { t } = useTranslation();
  const email = getSearchQuery("email");

  return (
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
          rowGap: "28px",
          maxWidth: "400px",
          p: "24px 24px 36px",
        }}
      >
        <Typography variant="h5">{t("accountVerification")}</Typography>
        <Box>
          <Typography display="inline" mr="5px">
            {t("registrationVerificationSent")}
          </Typography>
          <Typography display="inline" color="primary" suppressHydrationWarning>
            {email ? email?.toLowerCase() : ""}
          </Typography>
        </Box>

        <Typography>{t("pleaseCheckVerificatinInbox")}</Typography>
      </Card>
    </Box>
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

export default RegisterConfirmation;
