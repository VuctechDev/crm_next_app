"use client";
import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "next-i18next";

interface PageContentWrapperProps {
  title?: string;
  center?: boolean;
  children: React.ReactNode;
}

const PageContentWrapper: FC<PageContentWrapperProps> = ({
  title,
  center,
  children,
}): ReactElement => {
  const { t } = useTranslation();
  const path = usePathname();
  console.log(path?.split("/"), path);
  const breadcrumbItems = path?.split("/");
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: "48px 32px",
        minHeight: "98vh",
        height: "fit-content",
        display: "flex",
        // justifyContent: center ? "center" : "unset",
        flexDirection: "column",
        // alignItems: center ? "center" : "unset",
      }}
    >
      {title && (
        <Typography variant="h2" mb="10px">
          {t(title)}
        </Typography>
      )}
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbItems?.map((item, i) =>
            i !== breadcrumbItems.length - 1 ? (
              <Link
                key={item}
                color="inherit"
                href={breadcrumbItems.slice(0, i).join("/")}
              >
                <Typography color="info.main">
                  {!i ? t("home") : t(item)}
                </Typography>
              </Link>
            ) : (
              <Typography key={item}>{t(item)}</Typography>
            )
          )}
        </Breadcrumbs>
      </Box>
      <Box
        width={1}
        sx={{
          flexGrow: 1,
          pt: "50px",
          // p: "48px 32px",
          // minHeight: "98vh",
          // height: "fit-content",
          display: "flex",
          justifyContent: center ? "center" : "unset",
          flexDirection: "column",
          alignItems: center ? "center" : "unset",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageContentWrapper;
