import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ROUTES } from "../providers/guards/AuthRouteGuard";

interface PublicPageWrapperProps {
  children: React.ReactNode;
  actions?: React.ReactNode;
  title?: string;
}

const PublicPageWrapper: FC<PublicPageWrapperProps> = ({
  children,
  actions,
  title,
}): ReactElement => {
  const { t } = useTranslation();
  const { asPath } = useRouter();

  let maxWidth = "360px";
  if (asPath.includes(ROUTES.ONBOARDING.ROOT)) {
    maxWidth = "600px";
  }
  
  return (
    <Box
      width={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "84vh",
        p: "20px",
      }}
    >
      <Card
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: "24px",
          maxWidth: maxWidth,
          p: "24px 24px 36px",
        }}
      >
        {title && <Typography variant="h6">{t(title)}</Typography>}
        {children}
      </Card>

      {actions && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "20px",
          }}
        >
          {actions}
        </Box>
      )}
    </Box>
  );
};

export default PublicPageWrapper;
