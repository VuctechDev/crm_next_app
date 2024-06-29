import React, { FC, ReactElement } from "react";
import { Form, Formik } from "formik";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import SubmitButton from "../fields/SubmitButton";
import { initialValues, validationSchema } from "./config";
import FormFields from "./FormFields";
import { useCreateTag, useUpdateTag } from "@/lib/client/api/tags/queries";
import { TagType } from "@/db/tags";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateEmailTemplate } from "@/lib/client/api/email/templates/queries";

interface TemplateFormProps {
  data?: any | null;
  handleClear: () => void;
}

const TemplateForm: FC<TemplateFormProps> = ({
  data,
  handleClear,
}): ReactElement => {
  const { t } = useTranslation();
  const { mutateAsync: createTemplate } = useCreateEmailTemplate();
  const { mutateAsync: updateTag } = useUpdateTag();

  const handleSubmit = async (values: any) => {
    try {
      // if (data) {
      //   await updateTag(values);
      // } else {
      await createTemplate(values);
      // }
      console.log(values);
      handleClear();
    } catch (error) {
      console.error(error);
    }
  };

  const initialValuesHandler = data ? { ...data } : initialValues;
  return (
    <>
      <Box width={1} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {!data ? t("newTemplate") : t("editTemplate")}
        </Typography>
        {data && (
          <Box
            sx={(t) => ({
              height: "36px",
              borderRadius: "8px",
              backgroundColor: data.color,
              width: "fit-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: "0px 3px 0px 8px ",
              border: `1px solid ${t.palette.divider}`,
            })}
          >
            <Typography> {data.name}</Typography>
            <IconButton onClick={handleClear}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      <Formik
        key={data?._id}
        initialValues={initialValuesHandler}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <FormFields />
            <SubmitButton
              disabled={!dirty}
              loading={isSubmitting}
              label={data ? t("update") : t("create")}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TemplateForm;
