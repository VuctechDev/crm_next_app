import React, { FC, ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Card from "@mui/material/Card";
import PageLayout from "@/components/page-layout/PageLayout";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import TagsForm from "@/components/forms/tags/TagsForm";
import {
  useDeleteTag,
  useGetPaginatedTags,
} from "@/lib/client/api/tags/queries";
import { Grid, Tooltip, Typography } from "@mui/material";
import TableWrapper from "@/components/table/TableWrapper";
import { TagType } from "@/db/tags";
import { getDisplayDateTime } from "@/lib/client/getDisplayDate";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TooltipIconButton from "@/components/TooltipIconButton";
import CreateIcon from "@mui/icons-material/Create";
import ConfirmationModal from "@/components/ConfirmationModal";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TemplateForm from "@/components/forms/templates/TemplatesForm";
import { useGetEmailTemplates } from "@/lib/client/api/email/templates/queries";

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

  const [selectedTemplate, setSelectedTemplate] = useState<TagType | null>(
    null
  );
  const { data, isLoading } = useGetEmailTemplates(query);
  const { mutateAsync: deleteTag } = useDeleteTag();
  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  const handleModal = (_id?: number) => setDeleteId(_id ? `${_id}` : "");

  const handleDelete = async () => {
    try {
      deleteTag(+deleteId);
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
      render: (value: string, data: TagType) => (
        <>
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
        </>
      ),
      // preventClick: true,
    },
  ];

  return (
    <PageLayout>
      <PageContentWrapper title="templates">
        <Grid
          container
          columnSpacing="80px"
          // rowSpacing="36px"
          sx={{ px: "20px" }}
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
                  rowGap: "20px",
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

export default TemplatesPage;
