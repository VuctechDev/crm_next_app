import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Link from "next/link";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface AddLeadsProps {}

const options = [
  {
    label: "create",
    icon: <PersonAddAltOutlinedIcon fontSize="large" />,
    href: "/leads/add/new",
  },
  {
    label: "uploadBusinessCards",
    icon: <AddPhotoAlternateOutlinedIcon fontSize="large" />,
    href: "/leads/add/cards",
  },
  {
    label: "importCSV",
    icon: <UploadFileOutlinedIcon fontSize="large" />,
    href: "/leads/add/csv",
  },
];

const AddLeadsPage: FC<AddLeadsProps> = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <PageContentWrapper title="addNewLeads">
      <Box
        width={1}
        sx={{
          display: "flex",
          minHeight: "800px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {options.map((item) => (
          <Link href={item.href} key={item.label}>
            <Card
              elevation={3}
              sx={{
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
              }}
            >
              <Typography variant="h6">{t(item.label)}</Typography>
              <Box sx={{ mt: "16px" }}>{item.icon}</Box>
            </Card>
          </Link>
        ))}
      </Box>
    </PageContentWrapper>
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
