import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { useParams } from "next/navigation";
import { useGetLeadById } from "@/lib/client/api/leads/queries";
import PageLayout from "@/components/page-layout/PageLayout";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useGetUser } from "@/lib/client/api/user/queries";
import { useGetEmailConfig } from "@/lib/client/api/email/configs/queries";
import { useGetEmailSignature } from "@/lib/client/api/email/signature/queries";
import EmailForm from "@/components/forms/email/EmailForm";

interface NewLeadEmailPageProps {}

const NewLeadEmailPage: FC<NewLeadEmailPageProps> = (): ReactElement => {
  const params = useParams() as { _id: string };
  const { data, isLoading } = useGetLeadById(params?._id);
  const { data: emailConfig, isLoading: configLoading } = useGetEmailConfig();
  const { isLoading: isSignatureLoading } = useGetEmailSignature();
  const { data: user } = useGetUser();

  if (isLoading || configLoading || isSignatureLoading) {
    return <LoadingOverlayer />;
  }

  let from = `${user?.firstName} ${user?.lastName}`;
  if (emailConfig) {
    from += ` <${emailConfig?.email}>`;
  } else {
    from += ` <${process.env.NEXT_PUBLIC_EMAIL_USER}>`;
  }
  const name = `${data?.firstName} ${data?.lastName}`;

  return (
    <PageLayout title={name} labels={{ 2: data?.firstName }} center>
      <Box
        width={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          p: "20px",
        }}
      >
        <EmailForm to={data?.email} from={from} lead={params?._id} />
      </Box>
    </PageLayout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
    revalidate: 60,
  };
}

export default NewLeadEmailPage;
