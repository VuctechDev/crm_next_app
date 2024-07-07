import React, { FC, ReactElement } from "react";
import FilePicker from "@/components/file-picker/FIlePicker";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "@/components/page-layout/PageLayout";

interface CardUploadProps {}

const CardUpload: FC<CardUploadProps> = (): ReactElement => {
  return (
    <PageLayout title="uploadBusinessCards" center>
      <FilePicker type="img" />
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

export default CardUpload;
