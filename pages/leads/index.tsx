import React, { FC, ReactElement, useState } from "react";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import Card from "@mui/material/Card";
import QueryPanel from "@/components/table/header/QueryPanel";
import { useRouter, usePathname } from "next/navigation";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { LeadType } from "@/db/leads";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import TableWrapper from "@/components/table/TableWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface LeadsPageProps {
  params: { locale: string };
}

const headers = [
  "name",
  "role",
  "email",
  "company",
  "industry",
  "country",
  "website",
  // "Employees",
  // "Phone",
  // "Post code",
  // "Address",
  
];

const getData = async (query: string): Promise<LeadType[]> => {
  const response = await fetch(`/api/leads${query}`);
  const data = await response.json();
  console.log(data.data);
  return data.data;
};

const LeadsPage: FC<LeadsPageProps> = (): ReactElement => {
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
    <PageContentWrapper title="leads">
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
          skeletonCount={8}
          handlePagination={() => null}
          handleRowSelect={(_id: string) => router.push(path + `/${_id}`, {})}
          hover={false}
        />
      </Card>
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

export default LeadsPage;
