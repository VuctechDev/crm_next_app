import React, { FC, ReactElement, useEffect, useState } from "react";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import Card from "@mui/material/Card";
import { useRouter, usePathname } from "next/navigation";
import { LeadType } from "@/db/leads";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import TableWrapper from "@/components/table/TableWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSnackbar } from "@/components/providers/SnackbarContext";
import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useGetLeads } from "@/lib/client/api/leads/queries";
import PageLayout from "@/components/page-layout/PageLayout";

interface LeadsPageProps {
  params: { locale: string };
}

const headers = [
  { key: "name" },
  { key: "role" },
  { key: "email" },
  { key: "company" },
  { key: "industry" },
  { key: "country" },
  { key: "website" },
];

const LeadsPage: FC<LeadsPageProps> = (): ReactElement => {
  const { openSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const router = useRouter();
  const path = usePathname();

  const [query, setQuery] = useState("page=0&limit=10");
  const { data, isLoading, error } = useGetLeads(query);

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

  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    if (error) {
      openSnackbar(error?.message ?? "", "error");
    }
  }, [error]);

  return (
    <PageLayout>
      <PageContentWrapper
        title="leads"
        actions={
          <Link href="/leads/add">
            <Button variant="contained" color="primary">
              {t("add")}
            </Button>
          </Link>
        }
      >
        <Card
          elevation={1}
          sx={{ p: "0px", height: "1", borderRadius: "20px", width: "100%" }}
        >
          <TableWrapper
            data={data?.data ?? []}
            headers={headers}
            keys={keys}
            loading={isLoading}
            totalCount={data?.total ?? 0}
            skeletonCount={8}
            handleQueryChange={handleQueryChange}
            handleRowSelect={(_id: string) => router.push(path + `/${_id}`, {})}
            hover={true}
            filterKeys={["role", "industry", "country"]}
          />
        </Card>
      </PageContentWrapper>
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

export default LeadsPage;
