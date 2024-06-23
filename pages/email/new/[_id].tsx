import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { useParams } from "next/navigation";
import { useGetLeadById } from "@/lib/client/api/leads/queries";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import PageLayout from "@/components/page-layout/PageLayout";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useGetUser } from "@/lib/client/api/user/queries";
import NewEmail from "@/components/email/NewEmail";
import { useGetEmailConfig } from "@/lib/client/api/email/configs/queries";

interface NewLeadEmailPageProps {}

const NewLeadEmailPage: FC<NewLeadEmailPageProps> = (): ReactElement => {
  const params = useParams() as { _id: string };
  const { data, isLoading } = useGetLeadById(params?._id);
  const { data: emailConfig, isLoading: configLoading } = useGetEmailConfig();
  const { data: user } = useGetUser();

  if (isLoading || configLoading) {
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
    <PageLayout>
      <PageContentWrapper title={name} lastBreadcrumb={data?.firstName} center>
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
          <NewEmail to={data?.email} from={from} recipient={params?._id} />
        </Box>
      </PageContentWrapper>
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
