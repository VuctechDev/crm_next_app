import React, { FC, ReactElement, useEffect, useState } from "react";
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
import { getDisplayDateTime } from "@/lib/client/getDisplayDate";
import { useSnackbar } from "@/components/providers/SnackbarContext";

interface LeadsPageProps {
  params: { locale: string };
}

const headers = [
  // "ID",
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

const getData = async (
  filterQuery: string,
  paginationQuery: string
): Promise<{ data: LeadType[]; total: number }> => {
  const response = await fetch(`/api/leads?${paginationQuery}${filterQuery}`);
  const data = await response.json();
  return data;
};

const LeadsPage: FC<LeadsPageProps> = (): ReactElement => {
  const { openSnackbar } = useSnackbar();
  const [filterQuery, setFilterQuery] = useState("");
  const [paginationQuery, setPaginationQuery] = useState("page=0&limit=10");

  const { data, isLoading, error } = useQuery({
    queryKey: ["leads", filterQuery, paginationQuery],
    queryFn: () => getData(filterQuery, paginationQuery),
  });

  const router = useRouter();
  const path = usePathname();

  const keys = [
    // {
    //   key: "_id",
    // },
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
    // {
    //   key: "created",
    //   render: (value: string) => getDisplayDateTime(value),
    // },
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

  const handleFilters = (query: string) => {
    setFilterQuery(query);
    setPaginationQuery("page=0&limit=10");
  };

  const handlePagination = (query: string) => {
    setPaginationQuery(query);
  };

  useEffect(() => {
    if (error) {
      openSnackbar(error?.message ?? "", "error");
    }
  }, [error]);

  return (
    <PageContentWrapper title="leads">
      <Card
        elevation={1}
        sx={{ p: "0px", height: "1", borderRadius: "20px", width: "100%" }}
      >
        <QueryPanel
          keys={["role", "industry", "country"]}
          handleQueriesChange={handleFilters}
        />
        <TableWrapper
          data={data?.data ?? []}
          headers={headers}
          keys={keys}
          loading={isLoading}
          totalCount={data?.total ?? 0}
          skeletonCount={8}
          paginationReset={filterQuery}
          handlePagination={handlePagination}
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
