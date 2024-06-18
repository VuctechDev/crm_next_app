"use client";
import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import Breadcrumbs from "./Breadcrumbs";

interface PageContentWrapperProps {
  title?: string;
  center?: boolean;
  lastBreadcrumb?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const PageContentWrapper: FC<PageContentWrapperProps> = ({
  title,
  center,
  lastBreadcrumb,
  children,
  actions,
}): ReactElement => {
  const { t } = useTranslation();
  return (
    <Box
      component="main"
      sx={(t) => ({
        flexGrow: 1,
        p: "48px 32px",
        minHeight: "98vh",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        overflowX: "auto",
        [t.breakpoints.down("sm")]: {
          p: "20px",
        },
      })}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          maxHeight: "80px",
        }}
      >
        <Box>
          {title && (
            <Typography variant="h2" mb="12px">
              {t(title)}
            </Typography>
          )}
          <Breadcrumbs aria-label="breadcrumb" lastValue={lastBreadcrumb} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexGrow: 1,
            columnGap: "28px",
            pl: "36px",
          }}
        >
          {actions}
        </Box>
      </Box>

      <Box
        width={1}
        sx={{
          flexGrow: 1,
          pt: "50px",
          display: "flex",
          justifyContent: center ? "center" : "unset",
          flexDirection: "column",
          alignItems: center ? "center" : "unset",
          // overflowX: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageContentWrapper;
