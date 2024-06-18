import React, { FC, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import { Typography } from "@mui/material";

interface FieldLabelProps {
  label: string;
}

const FieldLabel: FC<FieldLabelProps> = ({ label }): ReactElement => {
  const { t } = useTranslation();
  return (
    <Typography mb="6px" variant="body2">
      {t(label)}
    </Typography>
  );
};

export default FieldLabel;
