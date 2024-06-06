"use client";
import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter, usePathname, useParams } from "next/navigation";
import { Typography } from "@mui/material";
import { LeadType } from "@/db/leads";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";

interface LeadPageProps {}

const getData = async (_id: string): Promise<LeadType> => {
  const response = await fetch(`/api/leads/${_id}`);
  const data = await response.json();
  console.log(data.data);
  return data.data;
};

const LeadPage: FC<LeadPageProps> = (): ReactElement => {
  const { t } = useTranslation();

  const params = useParams() as { _id: string };
  // const { } = useRouter()
  const { data, isLoading } = useQuery({
    queryKey: ["leads", params?._id],
    queryFn: () => getData(params?._id),
  });

  if (!data) {
    return <>Loading...</>;
  }

  console.log("LEADS: ", data);
  // const pageData = data?.find((item) => `${item._id}` === params?._id);

  const name = data?.firstName + " " + data?.lastName;
  return (
    <PageContentWrapper title={name} lastBreadcrumb={data?.firstName}>
      {/* <Typography>Name: {name}</Typography> */}
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
        <Typography variant="h5">{data?.role}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "8px",
          mt: "44px",
        }}
      >
        <Typography variant="h4">{data?.company}</Typography>
        <Typography variant="h5">{data?.industry}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocationOnIcon sx={{ mr: "10px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "6px",
              // mt: "44px",
            }}
          >
            <Typography>{data?.address}</Typography>
            <Typography>
              {data?.postCode}, {data?.city} - {data?.country}
            </Typography>
            {/* <Typography>{data?.country}</Typography> */}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
          <GroupIcon sx={{ mr: "10px" }} />
          <Typography> {data?.employees}</Typography>
        </Box>
        <a href={data?.website} target="_blak">
          <ScreenSearchDesktopOutlinedIcon fontSize="large" />
        </a>
        {/* <Typography>{}</Typography> */}
      </Box>

      {/* {Object.entries(data).map(([key, value]) => (
        <Typography>
          {t(key)}: {value}
        </Typography>
      ))} */}
    </PageContentWrapper>
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
