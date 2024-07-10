import React, { FC, ReactElement, useMemo } from "react";
import { useTranslation } from "next-i18next";
import { Grid } from "@mui/material";
import { useFormikContext } from "formik";
import { InitialValues, initialValues } from "./config";
import FieldLabel from "../fields/FieldLabel";
import TextField from "../fields/TextField";
import TagsSelect from "../fields/TagsSelect";
import TemplateSelect from "../fields/TemplateSelect";
import EmailBodyField from "../fields/EmailBodyField";
import EmailAIWrapper from "@/components/ai/email/EmailAIButton";

type Keys =
  | "from"
  | "to"
  | "tags"
  | "subject"
  | "body"
  | "template"
  | "signature";

interface FormFieldsProps {
  lead?: string;
}

const FormFields: FC<FormFieldsProps> = ({ lead }): ReactElement => {
  const { touched, errors, getFieldProps, values } =
    useFormikContext<InitialValues>();
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
      {values.to && (
        <Grid item xs={12}>
          <EmailAIWrapper />
        </Grid>
      )}

      {fields.map((name) => {
        const hideItem =
          (name === "tags" && !!lead) || (name === "to" && !lead);
        return (
          <>
            {!hideItem && (
              <Grid
                xs={12}
                md={name === "body" || name === "subject" ? 12 : 6}
                item
                key={name}
              >
                <FieldLabel label={name} />
                {name === "tags" && (
                  <TagsSelect
                    elementProps={{ ...getFieldProps(name) }}
                    error={getErrorMessage(name)}
                  />
                )}
                {name === "body" && (
                  <EmailBodyField
                    elementProps={{ ...getFieldProps(name) }}
                    error={getErrorMessage(name)}
                  />
                )}
                {name === "template" && (
                  <TemplateSelect
                    elementProps={{ ...getFieldProps(name) }}
                    error={getErrorMessage(name)}
                  />
                )}
                {name !== "tags" && name !== "body" && name !== "template" && (
                  <TextField
                    elementProps={{ ...getFieldProps(name) }}
                    error={getErrorMessage(name)}
                    readOnly={name === "from" || (name === "to" && !!lead)}
                  />
                )}
              </Grid>
            )}
          </>
        );
      })}
    </Grid>
  );
};

export default FormFields;
