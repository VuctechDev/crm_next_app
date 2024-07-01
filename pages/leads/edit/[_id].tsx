import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "@/components/page-layout/PageLayout";
import LeadsForm from "@/components/forms/leads/LeadsForm";
import Card from "@mui/material/Card";
import { useParams } from "next/navigation";
import { useGetLeadById } from "@/lib/client/api/leads/queries";
import LoadingOverlayer from "@/components/LoadingOverlayer";

interface EditLeadPageProps {}

const EditLeadPage: FC<EditLeadPageProps> = (): ReactElement => {
  const params = useParams() as { _id: string };
  const { data, isLoading } = useGetLeadById(params?._id);

  if (isLoading) {
    return <LoadingOverlayer />;
  }
  const name = data?.firstName + " " + data?.lastName;
  return (
    <PageLayout>
      <PageContentWrapper title={name} lastBreadcrumb={data?.firstName} center>
          <Card
            sx={(t) => ({
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "24px",
              maxWidth: "900px",
              p: "24px 24px 36px",
              [t.breakpoints.down("sm")]: {
                rowGap: "14px",
                p: "20px",
              },
            })}
          >
            <LeadsForm data={data} />
          </Card>
      
      </PageContentWrapper>
    </PageLayout>
  );
};

// export const getStaticPaths = async () => {
//   const paths = Array(500)
//     .fill(null)
//     .map((x, i) => ({ params: { _id: `${i + 1000}` } }));

//   console.log(paths);

//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getStaticPaths = async () => {
  // Provide an empty array for paths and fallback blocking
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

export default EditLeadPage;
