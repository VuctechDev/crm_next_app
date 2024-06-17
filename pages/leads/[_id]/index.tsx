"use client";
import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { useParams } from "next/navigation";
import { Button, Card, Typography } from "@mui/material";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
import { getDisplayDateTime } from "@/lib/client/getDisplayDate";
import { useGetLeadById } from "@/lib/client/api/leads/queries";
import PageLayout from "@/components/page-layout/PageLayout";
import { ROUTES } from "@/components/providers/guards/AuthRouteGuard";
import { getCountryName } from "@/lib/client/getCountry";

interface LeadPageProps {}

const LeadPage: FC<LeadPageProps> = (): ReactElement => {
  const { t } = useTranslation();

  const params = useParams() as { _id: string };
  const { data, isLoading } = useGetLeadById(params?._id);

  if (isLoading) {
    return <>Loading...</>;
  }

  const name = data?.firstName + " " + data?.lastName;

  return (
    <PageLayout>
      <PageContentWrapper
        title={name}
        lastBreadcrumb={data?.firstName}
        actions={
          <Link href={`${ROUTES.LEADS.EDIT.ROOT}/${params?._id}`}>
            <Button variant="contained" color="primary">
              {t("edit")}
            </Button>
          </Link>
        }
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "8px",
            width: "fit-content",
          }}
        >
          <Typography variant="body2">
            {getDisplayDateTime(data?.created)}
          </Typography>
          <Typography variant="h5">{data?.role}</Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: "8px" }}>
            <AlternateEmailIcon sx={{ mr: "10px" }} />
            <Typography> {data?.email}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SmartphoneIcon sx={{ mr: "10px" }} />
            <Typography> {data?.mobile}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PhoneEnabledIcon sx={{ mr: "10px" }} />
            <Typography> {data?.phone}</Typography>
          </Box>
        </Box>
        <Card
          sx={{
            display: "inline-flex",
            flexDirection: "column",
            rowGap: "8px",
            mt: "44px",
            p: "32px",
            borderRadius: "8px",
            width: "fit-content",
            minWidth: "300px",
          }}
        >
          <Typography variant="h4">{data?.company}</Typography>
          <Typography variant="h5">{data?.industry}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: "20px" }}>
            <LocationOnIcon sx={{ mr: "10px" }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "6px",
              }}
            >
              <Typography>{data?.address}</Typography>
              <Typography>
                {data?.zip}, {data?.city}
              </Typography>
              {data?.country && (
                <Typography>{getCountryName(data?.country)}</Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
            <GroupIcon sx={{ mr: "10px" }} />
            <Typography> {data?.employees}</Typography>
          </Box>
          {data?.website && (
            <a href={data?.website} target="_blak">
              <Button variant="outlined" color="info">
                {t("website")}
              </Button>
            </a>
          )}
        </Card>

        {/* <Card
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          rowGap: "8px",
          mt: "44px",
          p: "32px",
          borderRadius: "8px",
          width: "fit-content",
        }}
      >
        <Typography variant="h5">{t("tags")}</Typography>
      </Card>
      <Card
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          rowGap: "8px",
          mt: "44px",
          p: "32px",
          borderRadius: "8px",
          width: "fit-content",
        }}
      >
        <Typography variant="h5">{t("email")}</Typography>
      </Card> */}
        {/* <Card
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          rowGap: "8px",
          mt: "44px",
          p: "32px",
          borderRadius: "8px",
          width: "fit-content",
        }}
      >
        <Button variant="contained" color="error">
          {t("delete")}
        </Button>
      </Card> */}

        {/* {Object.entries(data).map(([key, value]) => (
        <Typography>
          {t(key)}: {value}
        </Typography>
      ))}  */}
        {/* <Divider sx={{ width: "100%", mt: "50px" }} />
      <Card sx={{ width: "900px" }}>
        <TextField
          fullWidth
          multiline
          rows={8}
          label={t("newComment")}
          sx={{ maxWidth: "800px", mt: "50px" }}
        />
      </Card> */}
      </PageContentWrapper>
    </PageLayout>
  );
};

export const getStaticPaths = async ({ locale }: { locale: string }) => {
  const paths = Array(500)
    .fill(null)
    .map((x, i) => ({ params: { _id: `${i + 1000}` } }));

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
    revalidate: 60,
  };
}

export default LeadPage;
