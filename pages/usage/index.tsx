import React, { FC, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import PageLayout from "@/components/page-layout/PageLayout";
import Grid from "@mui/material/Grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useGetUsage } from "@/lib/client/api/usage/queries";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import StatsWrapper from "@/components/stats/StatsWrapper";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { getStatsPeriod } from "@/lib/client/getDisplayDate";
import { Button, useTheme } from "@mui/material";
import { useGetSubscription } from "@/lib/client/api/subscriptions/queries";

interface UsagePageProps {}

const UsagePage: FC<UsagePageProps> = (): ReactElement => {
  const { data, isLoading } = useGetUsage();
  const { data: subscription, isLoading: subscriptionLoading } =
    useGetSubscription();
  const theme = useTheme();
  const { t } = useTranslation();

  if (isLoading || subscriptionLoading) {
    return <LoadingOverlayer />;
  }

  const leadsValues = [
    {
      label: "aiUploadedCards",
      value: data?.data?.cards,
      limit: subscription?.data?.cardUploads,
    },
    {
      label: "CSVCreatedLeads",
      value: data?.data?.csv,
      limit: subscription?.data?.csvImportedLeads,
    },
    {
      label: "manualyCreatedLeads",
      value: data?.data?.createdLeads,
      limit: subscription?.data?.manualyCreatedLeads,
    },
  ];

  const emailsValues = [
    {
      label: "AI generated Emails",
      value: data?.data?.emails,
      limit: subscription?.data?.aiGeneratedEmails,
    },
    { label: "templates", value: 3, limit: subscription?.data?.emailTemplates },
    {
      label: "signatures",
      value: 1,
      limit: subscription?.data?.emailSignatures,
    },
    {
      label: "Scheduled Emails",
      value: 13,
      limit: subscription?.data?.scheduledEmails,
    },
  ];

  const otherValues = [
    { label: "Users", value: 1, limit: subscription?.data?.users },
    { label: "tags", value: 5, limit: subscription?.data?.tags },
    { label: "Reminders", value: 10, limit: subscription?.data?.reminders },
  ];

  const getTextColor = (value: number, limit: number) => {
    const percentage = (value * 100) / limit;
    if (percentage < 40) {
      return theme.palette.success.light;
    } else if (percentage < 80) {
      return theme.palette.warning.light;
    } else {
      return theme.palette.error.light;
    }
  };

  return (
    <PageLayout
      title="usage"
      actions={<Button variant="outlined">Change your subscription</Button>}
    >
      <Typography variant="h3" mb="30px">
        {getStatsPeriod(data?.data?.period ?? "")}
      </Typography>
      <Typography variant="h6" mb="30px">
        {t("leadsCreation")}
      </Typography>

      <Grid
        container
        rowSpacing="24px"
        columnSpacing="30px"
        sx={(t) => ({
          px: "20px",
          [t.breakpoints.down("sm")]: {
            px: "6px",
          },
        })}
      >
        {leadsValues.map((value) => (
          <Grid key={value.label} item xs={12} md={3}>
            <Card
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: "20px 10px",
                rowGap: "20px",
              }}
            >
              <Typography variant="h6">{t(value.label)}</Typography>
              <Typography
                variant="h4"
                sx={{
                  color: getTextColor(value?.value ?? 0, value.limit ?? 0),
                }}
              >
                {value.value} / {value.limit}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" my="30px">
        Emails:
      </Typography>
      <Grid
        container
        rowSpacing="24px"
        columnSpacing="30px"
        sx={(t) => ({
          px: "20px",
          [t.breakpoints.down("sm")]: {
            px: "6px",
          },
        })}
      >
        {emailsValues.map((value) => (
          <Grid key={value.label} item xs={12} md={3}>
            <Card
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: "24px 20px",
                rowGap: "20px",
              }}
            >
              <Typography variant="h6">{t(value.label)}</Typography>
              <Typography
                variant="h4"
                sx={{
                  color: getTextColor(value?.value ?? 0, value.limit ?? 0),
                }}
              >
                {value.value} / {value.limit}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" my="30px">
        Other:
      </Typography>
      <Grid
        container
        rowSpacing="24px"
        columnSpacing="30px"
        sx={(t) => ({
          px: "20px",
          [t.breakpoints.down("sm")]: {
            px: "6px",
          },
        })}
      >
        {otherValues.map((value) => (
          <Grid key={value.label} item xs={12} md={3}>
            <Card
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: "24px 20px",
                rowGap: "20px",
              }}
            >
              <Typography variant="h6">{t(value.label)}</Typography>
              <Typography
                variant="h4"
                sx={{
                  color: getTextColor(value?.value ?? 0, value.limit ?? 0),
                }}
              >
                {value.value} / {value.limit}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
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

export default UsagePage;
