import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "@/components/page-layout/PageLayout";
import "react-quill/dist/quill.snow.css";
import EmailEditor from "@/components/email/Editor";
import { Card } from "@mui/material";
import {
  useCreateEmailSignature,
  useGetEmailSignature,
  useUpdateEmailSignature,
} from "@/lib/client/api/email/signature/queries";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import { useGetUser } from "@/lib/client/api/user/queries";
import { getCountryName } from "@/lib/shared/getCountry";
import { useTranslation } from "next-i18next";

interface SignaturePageProps {}

const SignaturePage: FC<SignaturePageProps> = (): ReactElement => {
  const { t } = useTranslation();

  const { data, isLoading } = useGetEmailSignature();
  const { data: user } = useGetUser();
  const { mutateAsync: createSignature, isPending: creationLoading } =
    useCreateEmailSignature();
  const { mutateAsync: updateSignature, isPending: updateLoading } =
    useUpdateEmailSignature();

  const handleSubmit = async (html: string) => {
    try {
      if (data) {
        await updateSignature(html);
      } else {
        await createSignature(html);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  const defaultSignature = `
  <h4>${t("defaultSignatureLabel")}</h4>
  <p><br/></p>
  <p><span style="color: rgb(136, 136, 136);">${user?.firstName} ${
    user?.lastName
  }, </span></p>
  <p><span style="color: rgb(136, 136, 136);">${user?.phone} </span></p>
  <p><span style="color: rgb(136, 136, 136);">${user?.role} - ${
    user?.organization?.name
  }, </span></p>
  <p><span style="color: rgb(136, 136, 136);">${
    user?.organization?.city
  }, ${getCountryName(user?.organization?.country)}</span></p>
`;
  return (
    <PageLayout>
      <PageContentWrapper title="emailSignature">
        <Box
          width={1}
          sx={(t) => ({
            display: "flex",
            minHeight: "600px",
            justifyContent: "center",
            alignItems: "center",
            [t.breakpoints.down("sm")]: {
              flexDirection: "column",
              justifyContent: "flex-start",
              rowGap: "24px",
            },
          })}
        >
          <Card>
            <EmailEditor
              handleSubmit={handleSubmit}
              loading={creationLoading || updateLoading}
              initialValue={data ? data?.html : defaultSignature}
              label="save"
            />
          </Card>
        </Box>
      </PageContentWrapper>
    </PageLayout>
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

export default SignaturePage;
