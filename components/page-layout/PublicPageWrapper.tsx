import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

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
          rowGap: "24px",
          maxWidth: "360px",
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
