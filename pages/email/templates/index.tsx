import React, { FC, ReactElement, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Card from "@mui/material/Card";
import PageLayout from "@/components/page-layout/PageLayout";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import TableWrapper from "@/components/table/TableWrapper";
import { getDisplayDateTime } from "@/lib/client/getDisplayDate";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TooltipIconButton from "@/components/TooltipIconButton";
import CreateIcon from "@mui/icons-material/Create";
import ConfirmationModal from "@/components/ConfirmationModal";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  useDeleteEmailTemplate,
  useGetPaginatedTemplates,
} from "@/lib/client/api/email/templates/queries";
import { EmailTemplateType } from "@/db/emails/templates";
import TemplateForm from "@/components/forms/email/templates/TemplatesForm";

const headers = [
  { key: "template" },
  { key: "description" },
  { key: "createdAt" },
  { key: "" },
];

interface TemplatesPageProps {}

const TemplatesPage: FC<TemplatesPageProps> = (): ReactElement => {
  const [query, setQuery] = useState("page=0&limit=10");
  const [deleteId, setDeleteId] = useState("");

  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplateType | null>(null);
  const { data, isLoading } = useGetPaginatedTemplates(query);
  const { mutateAsync: deleteTemplate } = useDeleteEmailTemplate();

  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  const handleModal = (_id?: number) => setDeleteId(_id ? `${_id}` : "");

  const handleDelete = async () => {
    try {
      await deleteTemplate(+deleteId);
    } catch (error) {
      console.error(error);
    }
  };

  const keys = [
    {
      key: "name",
    },
    {
      key: "description",
      render: (value: string) => (
        <Tooltip title={value} sx={{ width: "60px", cursor: "pointer" }}>
          <InfoOutlinedIcon sx={{ cursor: "pointer" }} />
        </Tooltip>
      ),
    },
    {
      key: "createdAt",
      render: (value: string) => (
        <Typography variant="body2">{getDisplayDateTime(value)}</Typography>
      ),
    },
    {
      key: "_id",
      render: (value: string, data: EmailTemplateType) => (
        <Box sx={{ display: "flex" }}>
          <TooltipIconButton
            title="edit"
            icon={<CreateIcon />}
            onClick={() => setSelectedTemplate(data)}
          />
          <TooltipIconButton
            title="delete"
            icon={<DeleteOutlineOutlinedIcon />}
            onClick={() => setDeleteId(value)}
          />
        </Box>
      ),
      // preventClick: true,
    },
  ];

  return (
    <PageLayout title="templates">
      <Grid
        container
        columnSpacing="80px"
        rowSpacing="24px"
        sx={(t) => ({
          px: "20px",
          [t.breakpoints.down("sm")]: {
            px: "6px",
          },
        })}
      >
        <Grid item xs={12} md={6}>
          <Card
            sx={(t) => ({
              width: "100%",
              display: "flex",
              flexDirection: "column",
              // rowGap: "24px",
              // maxWidth: "450px",
              // p: "24px 24px 36px",
              [t.breakpoints.down("sm")]: {
                rowGap: "14px",
              },
            })}
          >
            <TableWrapper
              data={data?.data ?? []}
              headers={headers}
              keys={keys}
              loading={isLoading}
              totalCount={data?.total ?? 0}
              skeletonCount={8}
              handleQueryChange={handleQueryChange}
              handleRowSelect={(_id: string) => null}
              hover={false}
              filterKeys={[]}
            />
          </Card>
        </Grid>
        {/* <Grid item xs={1} /> */}
        <Grid item xs={12} md={6}>
          <Card
            sx={(t) => ({
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "24px",
              p: "24px 24px 36px",
              [t.breakpoints.down("sm")]: {
                rowGap: "20px",
              },
            })}
          >
            <TemplateForm
              data={selectedTemplate}
              handleClear={() => setSelectedTemplate(null)}
            />
          </Card>
        </Grid>
      </Grid>
      {!!deleteId && (
        <ConfirmationModal
          title="deleteTemplate"
          message="deleteLeadConfirmation"
          onCancel={() => handleModal()}
          onConfirm={handleDelete}
        />
      )}
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

export default TemplatesPage;
