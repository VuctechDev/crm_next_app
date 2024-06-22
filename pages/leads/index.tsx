import React, { FC, ReactElement, useRef, useState } from "react";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";
import { LeadType } from "@/db/leads";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import TableWrapper from "@/components/table/TableWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, IconButton, TextField } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useGetLeads } from "@/lib/client/api/leads/queries";
import PageLayout from "@/components/page-layout/PageLayout";
import { ROUTES } from "@/components/providers/guards/AuthRouteGuard";
import { getCountryName } from "@/lib/shared/getCountry";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { handleFileDownload } from "@/lib/client/api/utils/downloadFile";
import FieldLabel from "@/components/forms/fields/FieldLabel";
import ConfirmationModal from "@/components/ConfirmationModal";
import { getCSVFileName } from "@/lib/client/getCSVFileName";
import { getDisplayDateTime } from "@/lib/client/getDisplayDate";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";

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
  { key: "" },
];

const LeadsPage: FC<LeadsPageProps> = (): ReactElement => {
  const { t } = useTranslation();
  const router = useRouter();

  const [query, setQuery] = useState("page=0&limit=10");
  const { data, isLoading } = useGetLeads(query);

  const [csvModalOpen, setCSVModalOpen] = useState(false);
  const inputRef = useRef("");

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
      render: (value: string) => getCountryName(value),
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
    {
      key: "website",
      render: (value: string, data: LeadType) => (
        <Link href={`${ROUTES.EMAIL.NEW}/${data._id}`}>
          <IconButton>
            <ForwardToInboxOutlinedIcon />
          </IconButton>
        </Link>
      ),
      preventClick: true,
    },
  ];

  const handleCSVModal = () => setCSVModalOpen((prev) => !prev);

  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  const noFiltersLabel = `(${t("all")})`;
  const defaultFileName = `${t("leads")} ${
    getCSVFileName(query) ?? noFiltersLabel
  } - ${getDisplayDateTime()}`;

  const handleExport = async () => {
    await handleFileDownload({
      fileName: inputRef.current ?? defaultFileName,
      query,
    });
  };

  return (
    <PageLayout>
      <PageContentWrapper
        title="leads"
        actions={
          <>
            <Link href={ROUTES.LEADS.ADD.ROOT}>
              <Button
                variant="outlined"
                color="info"
                startIcon={<GroupAddOutlinedIcon />}
              >
                {t("add")}
              </Button>
            </Link>
            <Button
              variant="outlined"
              color="info"
              startIcon={<FileDownloadIcon />}
              onClick={handleCSVModal}
              disabled={!data?.data?.length}
            >
              {t("exportCSV")}
            </Button>
          </>
        }
      >
        <Card
          elevation={1}
          sx={{
            p: "0px",
            height: "1",
            borderRadius: "20px",
            width: "100%",
            minWidth: "600px",
          }}
        >
          <TableWrapper
            data={data?.data ?? []}
            headers={headers}
            keys={keys}
            loading={isLoading}
            totalCount={data?.total ?? 0}
            skeletonCount={8}
            handleQueryChange={handleQueryChange}
            handleRowSelect={(_id: string) =>
              router.push(ROUTES.LEADS.ROOT + `/${_id}`, {})
            }
            hover={true}
            filterKeys={["role", "industry", "country"]}
          />
        </Card>
        {csvModalOpen && (
          <ConfirmationModal
            title="exportCSV"
            onCancel={handleCSVModal}
            onConfirm={handleExport}
          >
            <>
              <FieldLabel label="fileName" />
              <TextField
                onChange={(e) => (inputRef.current = e.target.value)}
                fullWidth
                defaultValue={defaultFileName}
              />
            </>
          </ConfirmationModal>
        )}
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
