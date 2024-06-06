import React, { FC, ReactElement } from "react";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface BreadcrumbsProps {
  lastValue?: string;
}

function generateBreadcrumbs(url: string): { label: string; href: string }[] {
  if (!url) {
    return [];
  }
  const segments = url.split("/").filter((segment) => segment);
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return { label: segment, href };
  });

  return [{ label: "home", href: "/" }, ...breadcrumbs];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ lastValue }): ReactElement => {
  const { t } = useTranslation();
  const path = usePathname();
  const breadcrumbItems = path?.split("/");

  const data = generateBreadcrumbs(path);

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {data?.map(({ label, href }, i) =>
        i !== breadcrumbItems.length - 1 ? (
          <Link key={label} color="inherit" href={href}>
            <Typography color="info.main">{t(label)}</Typography>
          </Link>
        ) : (
          <Typography key={label}>
            {lastValue ? t(lastValue) : t(label)}
          </Typography>
        )
      )}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
