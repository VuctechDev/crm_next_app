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

interface LeadPageProps {}

const getData = async (): Promise<LeadType[]> => {
  const response = await fetch("/api/leads");
  const data = await response.json();
  console.log(data.data);
  return data.data;
};

const LeadPage: FC<LeadPageProps> = (): ReactElement => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: getData,
  });

  const pageData = data?.find((item) => `${item._id}` === params?._id);
  return (
    <Box height={1} width={1}>
      {/* {JSON.stringify(pageData)} */}
      <Typography>Name: {pageData?.firstName}</Typography>
    </Box>
  );
};

export default LeadPage;
