import React, { FC, ReactElement, useMemo } from "react";
import { useTranslation } from "next-i18next";
import { Grid, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { InitialValues, initialValues } from "./UserForm";
import CountrySelect from "@/components/forms/fields/CountrySelect";
import TextField from "../fields/TextField";

type Keys = "firstName" | "lastName" | "email" | "country";

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

  const fields = useMemo(() => Object.keys(initialValues) as Keys[], []);
  return (
    <Grid container columnSpacing={4} rowGap={2}>
      {fields.map((name) => (
        <Grid xs={12} sm={6} item key={name}>
          <Typography
            variant="body2"
            sx={{
              mb: "6px",
            }}
          >
            {t(name)}
          </Typography>

          {name === "country" ? (
            <CountrySelect
              elementProps={{ ...getFieldProps(name) }}
              error={getErrorMessage(name)}
            />
          ) : (
            <TextField
              elementProps={{ ...getFieldProps(name) }}
              error={getErrorMessage(name)}
              readOnly={name === "email"}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default FormFields;
