import React, { FC, ReactElement } from "react";
import { Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import { initialValues, validationSchema } from "./config";
import FormFields from "./FormFields";
import SubmitButton from "../fields/SubmitButton";
import Card from "@mui/material/Card";
import { useGetEmailSignature } from "@/lib/client/api/email/signature/queries";
import { useSendEmail } from "@/lib/client/api/email/queries";
import { TagType } from "@/db/tags";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import { useDynamicTagsValidation } from "@/hooks/useDynamicTagsValidation";

interface EmailFormProps {
  to?: string;
  from?: string;
  lead?: string;
  tags?: number[];
}

const EmailForm: FC<EmailFormProps> = ({
  to,
  from,
  lead,
  tags,
}): ReactElement => {
  const { data: signature, isLoading } = useGetEmailSignature();
  const { t } = useTranslation();
  const validateDynamicTags = useDynamicTagsValidation();
  const { mutateAsync: sendEmail } = useSendEmail();

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  const handleSubmit = async (values: any) => {
    const invalid = validateDynamicTags(values.body);
    if (!invalid) {
      try {
        await sendEmail({
          ...values,
          tags: values?.tags.map((tag: TagType) => tag?._id),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  let body = signature ? `<p><br/></p> <p><br/></p> ${signature?.body}` : "";

  return (
    <Card
      sx={(t) => ({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: "24px",
        maxWidth: "900px",
        p: "24px 24px 36px",
        [t.breakpoints.down("sm")]: {
          rowGap: "20px",
        },
      })}
    >
      <Formik
        initialValues={{ ...initialValues, from, to, body, lead }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <FormFields lead={lead} />
            <SubmitButton
              disabled={!dirty}
              loading={isSubmitting}
              label={t("send")}
            />
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default EmailForm;
