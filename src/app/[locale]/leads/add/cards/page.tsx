import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import FilePicker from "@/components/file-picker/FIlePicker";

interface CardUploadProps {}

const CardUpload: FC<CardUploadProps> = (): ReactElement => {
  return (
    <Box>
      <FilePicker type="img" />
    </Box>
  );
};

export default CardUpload;
