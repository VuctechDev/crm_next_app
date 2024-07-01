"use client";
import React, { FC, ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import { useParams } from "next/navigation";
import { Button, Card, Divider, Typography } from "@mui/material";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
import { getDisplayDateTime } from "@/lib/client/getDisplayDate";
import {
  useDeleteCustomer,
  useGetLeadById,
} from "@/lib/client/api/leads/queries";
import PageLayout from "@/components/page-layout/PageLayout";
import { ROUTES } from "@/components/providers/guards/AuthRouteGuard";
import { getCountryName } from "@/lib/shared/getCountry";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useRouter } from "next/router";
import Comments from "@/components/comments/Comments";
import TagsWrapper from "@/components/tags/TagsWrapper";

interface LeadPageProps {}

const LeadPage: FC<LeadPageProps> = (): ReactElement => {
  const { t } = useTranslation();

  const params = useParams() as { _id: string };
  const { push } = useRouter();
  const { data, isLoading } = useGetLeadById(params?._id);
  const { mutateAsync } = useDeleteCustomer(params?._id);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleModal = () => setDeleteModalOpen((prev) => !prev);

  const handleDelete = async () => {
    try {
      await mutateAsync(params?._id);
      push(`${ROUTES.LEADS.ROOT}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  const name = data?.firstName + " " + data?.lastName;

  return (
    <PageLayout>
      <PageContentWrapper
        title={name}
        lastBreadcrumb={data?.firstName}
        actions={
          <>
            <Link href={`${ROUTES.LEADS.EDIT.ROOT}/${params?._id}`}>
              <Button
                variant="outlined"
                color="info"
                startIcon={<BorderColorIcon />}
              >
                {t("edit")}
              </Button>
            </Link>
            <Button color="error" variant="outlined" onClick={handleModal}>
              {t("delete")}
            </Button>
          </>
        }
      >
        <Box
          sx={(t) => ({
            display: "flex",
            justifyContent: "space-between",
            [t.breakpoints.down("sm")]: {
              flexDirection: "column",
              rowGap: "28px",
            },
          })}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "8px",
              width: "fit-content",
            }}
          >
            <Typography variant="body2">
              {getDisplayDateTime(data?.created)}
            </Typography>
            <Typography variant="h5">{data?.role}</Typography>

            {data?.email && (
              <Box sx={{ display: "flex", alignItems: "center", mt: "8px" }}>
                <AlternateEmailIcon sx={{ mr: "10px" }} />
                <Typography> {data?.email}</Typography>
              </Box>
            )}
            {data?.mobile && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SmartphoneIcon sx={{ mr: "10px" }} />
                <Typography> {data?.mobile}</Typography>
              </Box>
            )}
            {data?.phone && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PhoneEnabledIcon sx={{ mr: "10px" }} />
                <Typography> {data?.phone}</Typography>
              </Box>
            )}
          </Box>
          <Card
            sx={(t) => ({
              display: "flex",
              // flexWrap: "wrap",
              alignItems: "center",
              p: "28px",
              borderRadius: "8px",
              width: "fit-content",
              minWidth: "300px",
              height: "fit-content",
              [t.breakpoints.down("sm")]: {
                minWidth: "100%",
                p: "10px ",
              },
            })}
          >
            <Typography
              sx={(t) => ({
                mr: "12px",
                [t.breakpoints.down("sm")]: {
                  mr: "8px",
                },
              })}
              variant="h4"
            >
              {t("tags")}:
            </Typography>
            <TagsWrapper data={data?.tags ?? []} />
          </Card>
        </Box>

        <Card
          sx={(t) => ({
            display: "inline-flex",
            flexDirection: "column",
            rowGap: "8px",
            mt: "44px",
            p: "32px",
            borderRadius: "8px",
            width: "fit-content",
            minWidth: "300px",
            [t.breakpoints.down("sm")]: {
              minWidth: "100%",
              p: "16px ",
            },
          })}
        >
          {data?.company && (
            <Typography variant="h4">{data?.company}</Typography>
          )}
          {data?.industry && (
            <Typography variant="h5">{data?.industry}</Typography>
          )}
          <Box sx={{ display: "flex", alignItems: "center", mt: "20px" }}>
            <LocationOnIcon sx={{ mr: "10px" }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "6px",
              }}
            >
              <Typography>{data?.address}</Typography>
              {(data?.zip || data?.city) && (
                <Typography>
                  {data?.zip && data?.city
                    ? `${data?.zip}, ${data?.city}`
                    : `${data?.zip} ${data?.city}`}
                </Typography>
              )}
              {data?.country && (
                <Typography>{getCountryName(data?.country)}</Typography>
              )}
            </Box>
          </Box>

          {data?.employees && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <GroupIcon sx={{ mr: "10px" }} />
              <Typography> {data.employees}</Typography>
            </Box>
          )}
          {data?.website && (
            <a href={data?.website} target="_blak">
              <Button variant="outlined" color="info" sx={{ mt: "20px" }}>
                {t("website")}
              </Button>
            </a>
          )}
        </Card>
        <Divider
          sx={(t) => ({
            width: "100%",
            my: "60px",
            [t.breakpoints.down("sm")]: {
              my: "40px",
            },
          })}
        />
        <Comments parentId={params?._id} />
        {deleteModalOpen && (
          <ConfirmationModal
            title="deleteLead"
            message="deleteLeadConfirmation"
            onCancel={handleModal}
            onConfirm={handleDelete}
          />
        )}
      </PageContentWrapper>
    </PageLayout>
  );
};

// export const getStaticPaths = async ({ locale }: { locale: string }) => {
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

export default LeadPage;
