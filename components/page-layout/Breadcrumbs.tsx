import React, { FC, ReactElement } from "react";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface BreadcrumbsProps {
  labels?: { [key: number]: string | undefined };
}

function generateBreadcrumbs(
  url: string,
  labels: { [key: number]: string | undefined }
): { label: string; href: string }[] {
  if (!url) {
    return [];
  }
  const segments = url.split("/").filter((segment) => segment);
  const breadcrumbs = segments.map((segment, index) => {
    const label = labels?.[index];
    const href = "/" + segments.slice(0, index + 1).join("/");
    if (label) {
      return { label, href };
    }
    console.log(index, segment);

    return { label: segment, href };
  });
  return [{ label: "home", href: "/" }, ...breadcrumbs];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ labels }): ReactElement => {
  const { t } = useTranslation();
  const path = usePathname();
  const breadcrumbItems = path?.split("/");

  const data = generateBreadcrumbs(path, labels ?? {});

  if (data.length === 1) {
    return <></>;
  }

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {data?.map(({ label, href }, i) => {
        const nonLinkLabel = label === "edit" ? "edit" : label;
        return i !== breadcrumbItems.length - 1 && label !== "edit" ? (
          <Link key={label} color="inherit" href={href}>
            <Typography color="info.main">{t(label)}</Typography>
          </Link>
        ) : (
          <Typography key={label}>{t(nonLinkLabel)}</Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
