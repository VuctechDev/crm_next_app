import React, { FC, ReactElement } from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { getSearchQuery } from "@/lib/client/getSearchQuery";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormFields from "@/components/forms/login/FormFields";
import SubmitButton from "@/components/forms/fields/SubmitButton";
import PublicPageWrapper from "@/components/page-layout/PublicPageWrapper";
import { ROUTES } from "@/components/providers/guards/AuthRouteGuard";
import { useLogin } from "@/lib/client/api/auth/queries";

const dev = process.env.NODE_ENV === "development";

export const initialValues = dev
  ? {
      email: "stefan8vucic@gmail.com",
      password: "Aa123123@",
    }
  : {
      email: "",
      password: "",
    };

export type InitialValues = typeof initialValues;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("invalidEmail")
    .required("requiredField")
    .max(200, "max200char"),
  password: Yup.string().required("requiredField"),
});

const Login: FC = (): ReactElement => {
  const { t } = useTranslation();
  const { mutateAsync } = useLogin();

  const email = getSearchQuery("email");

  const handleSubmit = async (values: InitialValues) => {
    try {
      await mutateAsync(values);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PublicPageWrapper
      title="signin"
      callToAction={
        <>
          <Typography sx={{ mr: "8px" }}>{t("noAccountYet")}</Typography>
          <Link href={ROUTES.REGISTER}>
            <Typography color="info.main">{t("register")}</Typography>
          </Link>
        </>
      }
    >
      <Formik
        initialValues={{ ...initialValues, email }}
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

export default Login;
