"use client";
import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "@/components/page-layout/PageLayout";
import "react-quill/dist/quill.snow.css";
import EmailEditor from "@/components/email/Editor";
import { useGetUser } from "@/lib/client/api/user/queries";
import { Autocomplete } from "@mui/material";
import NewEmail from "@/components/email/NewEmail";

interface AddLeadsProps {}

const AddLeadsPage: FC<AddLeadsProps> = (): ReactElement => {
  const { data: user } = useGetUser();

  let from = `${user?.firstName} ${user?.lastName}`;
  if (user?.organization?.name) {
    from += ` / ${user?.organization?.name}`;
  }
  return (
    <PageLayout>
      <PageContentWrapper title="sendNewEmail">
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
          {/* <Autocomplete
          options={[]}
            renderInput={(params: any) => (
              <input />
              // <TextField
              //   // {...elementProps}
              //   {...params}
              //   error={!!error}
              //   helperText={
              //     <Typography color="error" textAlign="right" variant="body2">
              //       {error ?? ""}
              //     </Typography>
              //   }
              // />
            )}
          /> */}
          {/* <EmailEditor from={from} /> */}
          <NewEmail from={from} />
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

export default AddLeadsPage;
