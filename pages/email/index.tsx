import React, { FC, ReactElement, useState } from "react";
import Card from "@mui/material/Card";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import TableWrapper from "@/components/table/TableWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import PageLayout from "@/components/page-layout/PageLayout";
import { ROUTES } from "@/components/providers/guards/AuthRouteGuard";
import { getDisplayDateTime } from "@/lib/client/getDisplayDate";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import { useGetEmails } from "@/lib/client/api/email/queries";
import { EmailType } from "@/db/emails";
import StatsWrapper from "@/components/stats/StatsWrapper";
import { LeadType } from "@/db/leads";

interface EmailPageProps {
  params: { locale: string };
}

const headers = [
  { key: "from" },
  { key: "to" },
  { key: "subject" },
  { key: "status" },
  { key: "readAt" },
  { key: "sentAt" },
];

const EmailPage: FC<EmailPageProps> = (): ReactElement => {
  const { t } = useTranslation();

  const [query, setQuery] = useState("page=0&limit=10");
  const { data, isLoading } = useGetEmails(query);

  const keys = [
    {
      key: "from",
      render: (value: string, data: { lead: LeadType }) => {
        if (!value) {
          return (
            <Typography>{`${data?.lead?.firstName} ${data?.lead?.lastName}`}</Typography>
          );
        }
        return value;
      },
    },

    {
      key: "lead",
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
          {`${data?.to}`}
        </Typography>
      ),
    },
    {
      key: "subject",
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

  const handleQueryChange = (query: string) => {
    setQuery(query);
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
        {/* <StatsWrapper /> */}
        <Card
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

export default EmailPage;
