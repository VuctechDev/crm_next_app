import React, { FC, ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Card from "@mui/material/Card";
import PageLayout from "@/components/page-layout/PageLayout";
import PageContentWrapper from "@/components/page-layout/PageContentWrapper";
import Link from "next/link";
import Button from "@mui/material/Button";
import { ROUTES } from "@/components/providers/guards/AuthRouteGuard";
import TagsForm from "@/components/forms/tags/TagsForm";
import { useGetTags } from "@/lib/client/api/tags/queries";
import { Grid, Tooltip, Typography } from "@mui/material";
import TableWrapper from "@/components/table/TableWrapper";
import { TagType } from "@/db/tags";
import { getDisplayDateTime } from "@/lib/client/getDisplayDate";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TooltipIconButton from "@/components/TooltipIconButton";
import CreateIcon from "@mui/icons-material/Create";

const headers = [
  { key: "tag" },
  { key: "leads" },
  { key: "description" },
  { key: "createdAt" },
  { key: "" },
];

interface TagsPageProps {}

const TagsPage: FC<TagsPageProps> = ({}): ReactElement => {
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);
  const { t } = useTranslation();
  const { data, isLoading } = useGetTags();

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
          <Box
            sx={{
              height: "30px",
              borderRadius: "8px",
              backgroundColor: data.color,
              width: "fit-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: "6px 8px",
            }}
          >
            <Typography color="#fff"> {value}</Typography>
          </Box>
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
        <TooltipIconButton
          title="edit"
          icon={<CreateIcon />}
          onClick={() => setSelectedTag(data)}
        />
      ),
      // preventClick: true,
    },
  ];

  return (
    <PageLayout>
      <PageContentWrapper title="tags">
        <Grid
          container
          // columnSpacing="50px"
          rowSpacing="36px"
          sx={{ px: "20px" }}
        >
          <Grid item xs={12} md={8}>
            <Card
              sx={(t) => ({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                rowGap: "24px",
                // maxWidth: "450px",
                // p: "24px 24px 36px",
                [t.breakpoints.down("sm")]: {
                  rowGap: "20px",
                },
              })}
            >
              {/* <Box width={1} sx={{ display: "flex", columnGap: "20px" }}>
            {data?.map((tag) => (
              <Tooltip key={tag.tag} title={tag.description}>
                <Box
                  sx={{
                    height: "30px",
                    borderRadius: "4px",
                    backgroundColor: tag.color,
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: "6px 12px",
                  }}
                >
                  <Typography color="#fff"> {tag.tag}</Typography>
                </Box>
              </Tooltip>
            ))}
          </Box> */}

              <TableWrapper
                data={data ?? []}
                headers={headers}
                keys={keys}
                loading={isLoading}
                totalCount={10}
                // totalCount={data?.total ?? 0}
                skeletonCount={8}
                handleQueryChange={() => null}
                // handleQueryChange={handleQueryChange}
                handleRowSelect={(_id: string) => null}
                hover={false}
                filterKeys={[]}
              />
            </Card>
          </Grid>
          <Grid item xs={1} />
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
                  rowGap: "20px",
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
