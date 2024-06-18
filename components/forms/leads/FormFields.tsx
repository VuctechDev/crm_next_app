import React, { FC, ReactElement, useMemo } from "react";
import { useTranslation } from "next-i18next";
import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
import CountrySelect from "@/components/forms/fields/CountrySelect";
import TextField from "../fields/TextField";
import { InitialValues, initialValues } from "./config";
import FieldLabel from "../fields/FieldLabel";

type Keys =
  | "firstName"
  | "lastName"
  | "role"
  | "email"
  | "phone"
  | "industry"
  | "mobile"
  | "employees"
  | "description"
  | "website"
  | "address"
  | "city"
  | "zip"
  | "country";

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
        <Grid xs={12} sm={name === "description" ? 12 : 6} item key={name}>
          <FieldLabel label={name} />

          {name === "country" ? (
            <CountrySelect
              elementProps={{ ...getFieldProps(name) }}
              error={getErrorMessage(name)}
            />
          ) : (
            <TextField
              elementProps={{ ...getFieldProps(name) }}
              error={getErrorMessage(name)}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default FormFields;
