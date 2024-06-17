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
import { getCountry } from "@/lib/client/getCountry";

interface LeadsFormProps {
  data?: LeadType;
}

const LeadsForm: FC<LeadsFormProps> = ({ data }): ReactElement => {
  const { t } = useTranslation();
  const { push, replace } = useRouter();
  const { mutateAsync: createLead } = useCreateLead();
  const { mutateAsync: updateLead } = useUpdateLead(`${data?._id}`);
  const handleSubmit = async (values: any) => {
    try {
      if (!data) {
        await createLead({
          ...values,
          country: values?.country?.iso3,
        });
        push(`${ROUTES.LEADS.ROOT}`);
      } else {
        const changedValues = getChangedValues<LeadType>(
          { ...values, country: values?.country?.iso3 },
          data
        );
        await updateLead({ data: changedValues, _id: data._id });
        replace(`${ROUTES.LEADS.ROOT}/${data._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const initialValuesHandler = data
    ? { ...initialValues, ...data, country: getCountry(data.country) }
    : initialValues;
  return (
    <>
      <Typography variant="h6">{t("newLead")}</Typography>
      <Formik
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

export default LeadsForm;
