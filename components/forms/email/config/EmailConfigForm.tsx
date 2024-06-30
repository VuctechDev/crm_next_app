import React, { FC, ReactElement } from "react";
import { Form, Formik } from "formik";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import SubmitButton from "../../fields/SubmitButton";
import { initialValues, validationSchema } from "./config";
import FormFields from "./FormFields";
import { useCreateEmailConfig } from "@/lib/client/api/email/configs/queries";

interface EmailConfigFormProps {}

const EmailConfigForm: FC<EmailConfigFormProps> = (): ReactElement => {
  const { t } = useTranslation();
  const { mutateAsync: createEmailConfig } = useCreateEmailConfig();

  const handleSubmit = async (values: any) => {
    try {
      await createEmailConfig(values);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Typography variant="h6">{t("emailConfig")}</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <FormFields />
            <SubmitButton
              disabled={!dirty}
              loading={isSubmitting}
              label={t("save")}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EmailConfigForm;
