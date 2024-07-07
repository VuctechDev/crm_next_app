import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "@/components/page-layout/PageLayout";
import { ROUTES } from "@/components/providers/guards/AuthRouteGuard";

interface AddLeadsProps {}

const options = [
  {
    label: "create",
    icon: <PersonAddAltOutlinedIcon fontSize="large" />,
    href: ROUTES.LEADS.ADD.NEW,
  },
  {
    label: "uploadBusinessCards",
    icon: <AddPhotoAlternateOutlinedIcon fontSize="large" />,
    href: ROUTES.LEADS.ADD.CARDS,
  },
  {
    label: "importCSV",
    icon: <UploadFileOutlinedIcon fontSize="large" />,
    href: ROUTES.LEADS.ADD.CSV,
  },
];

const AddLeadsPage: FC<AddLeadsProps> = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <PageLayout title="addNewLeads">
      <Box
        width={1}
        sx={(t) => ({
          display: "flex",
          minHeight: "600px",
          justifyContent: "center",
          alignItems: "center",
          [t.breakpoints.down("sm")]: {
            flexDirection: "column",
            justifyContent: "flex-start",
            rowGap: "24px",
          },
        })}
      >
        {options.map((item) => (
          <Link href={item.href} key={item.label}>
            <Card
              elevation={3}
              sx={(t) => ({
                mx: "30px",
                width: "260px",
                height: "180px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                cursor: "pointer",
                transition: "transform 0.4s",
                borderRadius: "20px",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                [t.breakpoints.down("sm")]: {
                  mx: "0px",
                  width: "220px",
                  height: "120px",
                },
              })}
            >
              <Typography variant="h6">{t(item.label)}</Typography>
              <Box sx={{ mt: "16px" }}>{item.icon}</Box>
            </Card>
          </Link>
        ))}
      </Box>
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

export default AddLeadsPage;
