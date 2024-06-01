import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import FilePicker from "@/components/file-picker/FIlePicker";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

interface CSVUploadProps {}

const CSVUpload: FC<CSVUploadProps> = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <PageContentWrapper title="importCSV" center>
      <Box
        width={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FilePicker type="csv" />
        <Typography variant="h6" my="28px">
          {t("csvUploadDescription")}
        </Typography>
        <a download href="/template.csv">
          <Typography color="info.main"> {t("downloadCSVTemplate")}</Typography>
        </a>
      </Box>
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

export default CSVUpload;
