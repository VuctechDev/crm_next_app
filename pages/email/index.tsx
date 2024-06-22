import React, { FC, ReactElement, useRef, useState } from "react";

import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";
import { LeadType } from "@/db/leads";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import TableWrapper from "@/components/table/TableWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
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
import { useGetEmails } from "@/lib/client/api/email/queries";
import { EmailType } from "@/db/emails";

interface LeadsPageProps {
  params: { locale: string };
}

const headers = [
  { key: "sentBy" },
  { key: "subject" },
  { key: "recipient" },
  { key: "status" },
  { key: "readAt" },
  { key: "sentAt" },
  // { key: "website" },
  // { key: "" },
];

const LeadsPage: FC<LeadsPageProps> = (): ReactElement => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const [query, setQuery] = useState("page=0&limit=10");
  const { data, isLoading } = useGetEmails(query);

  const [csvModalOpen, setCSVModalOpen] = useState(false);
  const inputRef = useRef("");

  const keys = [
    {
      key: "sentBy",
      render: (
        value: { firstName: string; lastName: string },
        data: LeadType
      ) => <Typography>{`${value.firstName} ${value?.lastName}`}</Typography>,
    },
    {
      key: "subject",
    },
    {
      key: "recipient",
      render: (
        value: {
          firstName: string;
          lastName: string;
          email: string;
        },
        data: EmailType
      ) => (
        <Typography>
          {value && `${value?.firstName} ${value?.lastName}`} {value && <br />}
          {`${data?.recipientEmail}`}
        </Typography>
      ),
    },
    {
      key: "open",
      render: (value: string, data: EmailType) => {
        if (!value) {
          return (
            <Box
              sx={(t) => ({
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              })}
            >
              <Typography
                variant="body2"
                textAlign="center"
                color="#fff"
                sx={(t) => ({
                  p: "6px",
                  backgroundColor: t.palette.info.main,
                  borderRadius: "12px",
                  width: "70px",
                })}
              >
                {t("sent")}
              </Typography>
            </Box>
          );
        } else {
          return (
            <Box
              sx={(t) => ({
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              })}
            >
              <Typography
                sx={(t) => ({
                  p: "6px",
                  backgroundColor: t.palette.success.main,
                  borderRadius: "12px",
                  width: "70px",
                })}
                variant="body2"
                textAlign="center"
                color="#fff"
              >
                {t("read")}
              </Typography>
            </Box>
          );
        }
      },
    },
    {
      key: "updatedAt",
      render: (value: string, data: EmailType) => {
        if (!data.open) {
          return <Typography variant="body2">/</Typography>;
        } else {
          return (
            <Typography variant="body2">{getDisplayDateTime(value)}</Typography>
          );
        }
      },
    },
    {
      key: "createdAt",
      render: (value: string) => (
        <Typography variant="body2">{getDisplayDateTime(value)}</Typography>
      ),
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
        title="emails"
        actions={
          <Link href={ROUTES.EMAIL.NEW}>
            <Button
              variant="outlined"
              color="info"
              startIcon={<ForwardToInboxOutlinedIcon />}
            >
              {t("new")}
            </Button>
          </Link>
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
            handleRowSelect={(_id: string) => null}
            hover={false}
            filterKeys={[
              {
                label: "status",
                options: [
                  { label: "sent", value: "sent" },
                  { label: "read", value: "read" },
                ],
              },
            ]}
          />
        </Card>
        {/* {csvModalOpen && (
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
        )} */}
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
