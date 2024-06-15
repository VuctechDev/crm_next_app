import React, { FC, ReactElement } from "react";
import { useFormikContext } from "formik";
import { InitialValues } from "@/pages/register";
import { useTranslation } from "next-i18next";
import { Grid, Typography } from "@mui/material";
import TextField from "../fields/TextField";
import PasswordField from "../fields/PasswordField";

type Keys = "email" | "password" | "confirmPassword";

interface FormFieldsProps {}

const FormFields: FC<FormFieldsProps> = (): ReactElement => {
  const { touched, errors, getFieldProps } = useFormikContext<InitialValues>();
  const { t } = useTranslation();

  const getErrorMessage = (name: Keys) => {
    if (touched[name] && errors[name]) {
      return t(errors[name] as string);
    }
    return "";
  };

  return (
    <Grid container rowGap={2}>
      <Grid xs={12} item>
        <Typography variant="body2" mb="6px">
          {t("email")}
        </Typography>
        <TextField
          elementProps={{ ...getFieldProps("email") }}
          error={getErrorMessage("email")}
        />
      </Grid>
      <PasswordField
        error={getErrorMessage("password")}
        confirmError={getErrorMessage("confirmPassword")}
        withConfirmation
      />
    </Grid>
  );
};

export default FormFields;
