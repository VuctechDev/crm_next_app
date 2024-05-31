"use client";
import React, { FC, ReactElement, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import TableWrapper from "../../../components/table/TableWrapper";
import Card from "@mui/material/Card";
import QueryPanel from "@/components/table/header/QueryPanel";
import { useRouter, usePathname } from "next/navigation";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { LeadType } from "@/db/leads";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import initTranslations from "@/app/i18n";
import { useTranslation } from "react-i18next";

interface LeadsPageProps {
  params: { locale: string };
}

const headers = [
  "Name",
  "Role",
  "Email",
  "Company",
  "Industry",
  // "Employees",

  // "Phone",
  "Country",
  // "Post code",
  // "Address",
  "Website",
];

const getData = async (query: string): Promise<LeadType[]> => {
  const response = await fetch(`/api/leads${query}`);
  const data = await response.json();
  console.log(data.data);
  return data.data;
};

const LeadsPage: FC<LeadsPageProps> = (): ReactElement => {
  const { t } = useTranslation();

  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["leads", query],
    queryFn: () => getData(query),
    // initialData: getItems(),
  });

  const router = useRouter();
  const path = usePathname();

  const keys = [
    {
      key: "firstName",
      render: (value: string, data: LeadType) => `${value} ${data?.lastName}`,
    },
    {
      key: "role",
    },
    {
      key: "email",
    },
    {
      key: "company",
    },
    {
      key: "industry",
    },
    // {
    //   key: "employees",
    // },

    {
      key: "country",
    },
    {
      key: "website",
      render: (value: string) => (
        <a href={value} target="_blak">
          <ScreenSearchDesktopOutlinedIcon />
        </a>
      ),
      preventClick: true,
    },
  ];

  const handleQueriesChange = (query: string) => {
    setQuery(query);
  };

  return (
    <PageContentWrapper title={t("hello")}>
      <Card
        elevation={1}
        sx={{ p: "0px", height: "1", borderRadius: "20px", width: "100%" }}
      >
        <QueryPanel
          keys={["role", "industry", "country"]}
          handleQueriesChange={handleQueriesChange}
        />
        <TableWrapper
          data={data ?? []}
          headers={headers}
          keys={keys}
          page={0}
          loading={isLoading}
          pageRows={10}
          totalCount={100}
          handlePagination={() => null}
          handleRowSelect={(_id: string) => router.push(path + `/${_id}`, {})}
          hover={false}
        />
      </Card>
    </PageContentWrapper>
  );
};

export default LeadsPage;
