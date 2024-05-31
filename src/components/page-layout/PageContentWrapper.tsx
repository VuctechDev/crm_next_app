"use client";
import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const path = usePathname();
  console.log(path?.split("/"));
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
      <Typography variant="h2" mb="10px">
        {title}
      </Typography>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbItems?.map((item, i) =>
            i !== breadcrumbItems.length - 1 ? (
              <Link key={item} color="inherit" href="/">
                <Typography color="info.main">{!i ? "home" : item}</Typography>
              </Link>
            ) : (
              <Typography key={item}>{item}</Typography>
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
