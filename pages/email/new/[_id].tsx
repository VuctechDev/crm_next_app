import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { useParams } from "next/navigation";
import { useGetLeadById } from "@/lib/client/api/leads/queries";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import PageLayout from "@/components/page-layout/PageLayout";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import EmailEditor from "@/components/email/Editor";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useGetUser } from "@/lib/client/api/user/queries";

interface NewLeadEmailPageProps {}

const NewLeadEmailPage: FC<NewLeadEmailPageProps> = (): ReactElement => {
  const params = useParams() as { _id: string };
  const { data, isLoading } = useGetLeadById(params?._id);
  const { data: user } = useGetUser();

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  const name = user?.firstName + " " + user?.lastName;
  let from = user?.firstName + " " + user?.lastName;
  if (user?.organization?.name) {
    from += ` / ${user?.organization?.name}`;
  }
  return (
    <PageLayout>
      <PageContentWrapper
        title={"name"}
        lastBreadcrumb={data?.firstName}
        center
      >
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
          <EmailEditor to={data?.email} from={from} recipient={params?._id} />
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
