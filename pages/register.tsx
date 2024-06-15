import React, { FC, ReactElement } from "react";
import { useRegister } from "@/lib/client/api/auth/actions";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormFields from "@/components/forms/register/FormFields";
import SubmitButton from "@/components/forms/fields/SubmitButton";
import PublicPageWrapper from "@/components/page-layout/PublicPageWrapper";

export const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export type InitialValues = typeof initialValues;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("invalidEmail")
    .required("requiredField")
    .max(200, "max200char"),
  password: Yup.string()
    .required("requiredField")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})/,
      ""
    ),
  confirmPassword: Yup.string()
    .required("requiredField")
    .oneOf([Yup.ref(`password`)], "passwordMustMatch"),
});

const Register: FC = (): ReactElement => {
  const { t } = useTranslation();
  const { push, locale } = useRouter();
  const { mutateAsync } = useRegister();

  const handleSubmit = async (values: InitialValues) => {
    try {
      await mutateAsync(values);
      push(
        `/register-confirmation?email=${encodeURIComponent(values.email)}`,
        `/register-confirmation?email=${encodeURIComponent(values.email)}`,
        { locale }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PublicPageWrapper
      title="register"
      callToAction={
        <>
          <Typography sx={{ mr: "8px" }}>{t("alreadyHaveAccount")}</Typography>
          <Link href="/login">
            <Typography color="info.main">{t("signin")}</Typography>
          </Link>
        </>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormFields />
            <SubmitButton loading={isSubmitting} label={t("signin")} />
          </Form>
        )}
      </Formik>
    </PublicPageWrapper>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
    revalidate: 60,
  };
}

export default Register;
