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
import TagItem from "@/components/tags/TagItem";

const headers = [
  { key: "tag" },
  { key: "leads" },
  { key: "description" },
  { key: "createdAt" },
  { key: "" },
];

interface TagsPageProps {}

const TagsPage: FC<TagsPageProps> = (): ReactElement => {
  const [query, setQuery] = useState("page=0&limit=10");
  const [deleteId, setDeleteId] = useState("");

  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);
  const { data, isLoading } = useGetPaginatedTags(query);
  const { mutateAsync: deleteTag } = useDeleteTag();
  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  const handleModal = (_id?: number) => setDeleteId(_id ? `${_id}` : "");

  const handleDelete = async () => {
    try {
      await deleteTag(+deleteId);
    } catch (error) {
      console.error(error);
    }
  };

  const keys = [
    {
      key: "tag",
      render: (value: string, data: TagType) => (
        <Box
          width={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <TagItem data={data} />
        </Box>
      ),
    },
    {
      key: "leads",
      render: (value: string, data: TagType) => <Typography> 56</Typography>,
    },
    {
      key: "description",
      render: (value: string) => (
        <Tooltip title={value} sx={{ width: "60px" }}>
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
        <Box sx={{ display: "flex" }}>
          <TooltipIconButton
            title="edit"
            icon={<CreateIcon />}
            onClick={() => setSelectedTag(data)}
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
    <PageLayout>
      <PageContentWrapper title="tags">
        <Grid
          container
          rowSpacing="24px"
          sx={(t) => ({
            px: "20px",
            [t.breakpoints.down("sm")]: {
              px: "6px",
            },
          })}
        >
          <Grid item xs={12} md={8}>
            <Card
              sx={(t) => ({
                width: "100%",
                display: "flex",
                flexDirection: "column",
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
          <Grid
            item
            xs={1}
            sx={(t) => ({ [t.breakpoints.down("sm")]: { display: "none" } })}
          />
          <Grid item xs={12} md={3}>
            <Card
              sx={(t) => ({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                rowGap: "24px",
                maxWidth: "430px",
                p: "24px 24px 36px",
                [t.breakpoints.down("sm")]: {
                  rowGap: "14px",
                  p: "20px",
                },
              })}
            >
              <TagsForm
                data={selectedTag}
                handleClear={() => setSelectedTag(null)}
              />
            </Card>
          </Grid>
        </Grid>
        {!!deleteId && (
          <ConfirmationModal
            title="deleteTag"
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

export default TagsPage;
