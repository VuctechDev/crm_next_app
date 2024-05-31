import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import FilePicker from "@/components/file-picker/FIlePicker";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";

interface CSVUploadProps {}

const CSVUpload: FC<CSVUploadProps> = (): ReactElement => {
  return (
    <PageContentWrapper title="Import CSV" center>
      <FilePicker type="csv" />
    </PageContentWrapper>
  );
};

export default CSVUpload;
