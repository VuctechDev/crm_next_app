import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import FilePicker from "@/components/file-picker/FIlePicker";

interface CSVUploadProps {}

const CSVUpload: FC<CSVUploadProps> = (): ReactElement => {
  return (
    <Box>
      <FilePicker type="csv" />
    </Box>
  );
};

export default CSVUpload;
