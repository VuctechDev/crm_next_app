import React, { FC, ReactElement } from "react";
import { Form, Formik } from "formik";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import SubmitButton from "../fields/SubmitButton";
import { ROUTES } from "@/components/providers/guards/AuthRouteGuard";
import { initialValues, validationSchema } from "./config";
import { useCreateLead, useUpdateLead } from "@/lib/client/api/leads/queries";
import FormFields from "./FormFields";
import { LeadType } from "@/db/leads";
import { getChangedValues } from "@/lib/shared/getChangedValues";
import { getCountry } from "@/lib/shared/getCountry";
import { useCreateTag } from "@/lib/client/api/tags/queries";
import { TagType } from "@/db/tags";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TagsFormProps {
  data?: TagType | null;
  handleClear: () => void;
}

const TagsForm: FC<TagsFormProps> = ({ data, handleClear }): ReactElement => {
  const { t } = useTranslation();
  const { push, replace } = useRouter();
  const { mutateAsync: createTag } = useCreateTag();
  const { mutateAsync: updateLead } = useUpdateLead(`${data?._id}`);

  const handleSubmit = async (values: any) => {
    try {
      console.log(values);
      await createTag(values);
      // if (!data) {
      //   await createLead({
      //     ...values,
      //     country: values?.country?.iso3,
      //   });
      //   push(`${ROUTES.LEADS.ROOT}`);
      // } else {
      //   const changedValues = getChangedValues<LeadType>(
      //     { ...values, country: values?.country?.iso3 },
      //     data
      //   );
      //   await updateLead({ data: changedValues, _id: data._id });
      //   replace(`${ROUTES.LEADS.ROOT}/${data._id}`);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const initialValuesHandler = data ? { ...data } : initialValues;
  return (
    <>
      <Box width={1} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {!data ? t("newTag") : t("editTag")}
        </Typography>
        {data && (
          <Box
            sx={{
              height: "30px",
              borderRadius: "8px",
              backgroundColor: data.color,
              width: "fit-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: "6px 3px 6px 8px ",
            }}
          >
            <Typography color="#fff"> {data.tag}</Typography>
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

export default TagsForm;
