import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import FilePicker from "@/components/file-picker/FIlePicker";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface CardUploadProps {}

const CardUpload: FC<CardUploadProps> = (): ReactElement => {
  return (
    <PageContentWrapper title="uploadBusinessCards" center>
      <FilePicker type="img" />
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

export default CardUpload;
