import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getSearchQuery } from "@/lib/client/getSearchQuery";
import PublicPageWrapper from "@/components/page-layout/PublicPageWrapper";

interface RegisterConfirmationProps {}

const RegisterConfirmation: FC<
  RegisterConfirmationProps
> = (): ReactElement => {
  const { t } = useTranslation();
  const email = getSearchQuery("email");

  return (
    <PublicPageWrapper>
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
    </PublicPageWrapper>
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
