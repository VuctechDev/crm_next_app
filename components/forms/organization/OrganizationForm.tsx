import React, { FC, ReactElement } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import SubmitButton from "../fields/SubmitButton";
import FormFields from "./FormFields";
import {
  useCreateOrganization,
  useUpdateOrganization,
} from "@/lib/client/api/organization/queries";
import { ROUTES } from "@/components/providers/guards/AuthRouteGuard";

export const initialValues = {
  name: "ELAS doo",
  industry: "Metal",
  yourRole: "Sales Manager",
  website: "https://www.elas.ba",
  // website: "https://www.",
  address: "Ramici bb",
  city: "Banja Luka",
  zip: "78000",
  country: { name: "", iso3: "", iso: "", phoneCode: "" },
};

export type InitialValues = typeof initialValues;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("requiredField").max(40, "max40char"),
  yourRole: Yup.string().required("requiredField").max(40, "max40char"),
  industry: Yup.string().required("requiredField").max(40, "max40char"),
  address: Yup.string().required("requiredField").max(50, "max50char"),
  city: Yup.string().required("requiredField").max(50, "max50char"),
  zip: Yup.string().required("requiredField").max(12, "max12char"),
  country: Yup.object().shape({ iso3: Yup.string().required("requiredField") }),
  website: Yup.string()
    .required("requiredField")
    .matches(
      /^https:\/\/(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
      "mustBeURL"
    )
    .matches(/^https:\/\//, "mustStartHTTPS"),
});

interface OrganizationFormProps {}

const OrganizationForm: FC<OrganizationFormProps> = (): ReactElement => {
  const { asPath, push } = useRouter();
  const { mutateAsync: createUser } = useCreateOrganization();
  const { mutateAsync: updateUser } = useUpdateOrganization();
  const { t } = useTranslation();

  const handleSubmit = async (values: InitialValues) => {
    try {
      if (asPath === ROUTES.ONBOARDING.ORGANIZATION) {
        await createUser({
          ...values,
          country: values?.country?.iso3,
          role: values?.yourRole,
        });
      } else {
        await updateUser({
          ...values,
          country: values?.country?.iso3,
          role: values?.yourRole,
        });
      }
      push(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Typography variant="h6">{t("organizationInfo")}</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormFields />
            <SubmitButton loading={isSubmitting} label={t("save")} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OrganizationForm;
