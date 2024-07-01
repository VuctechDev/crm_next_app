import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { TagType } from "@/db/tags";
import TagItem from "./TagItem";
import { Typography } from "@mui/material";

interface TagsWrapperProps {
  data: TagType[];
  small?: boolean;
  displayCount?: number;
}

const TagsWrapper: FC<TagsWrapperProps> = ({
  data,
  displayCount,
  ...rest
}): ReactElement => {
  const dataHandler = displayCount ? data.slice(0, displayCount) : [...data];
  const extraCount = displayCount ? data?.length - displayCount : 0;
  if (!data.length) {
    return <Typography variant="body2">/</Typography>;
  }
  return (
    <Box
      sx={(t) => ({
        display: "flex",
        minWidth: "220px",
        flexWrap: "wrap",
        columnGap: "6px",
        rowGap: "4px",
        justifyContent: "flex-end",
        alignItems: "center",
        [t.breakpoints.down("sm")]: {
          minWidth: "0px",
          justifyContent: "flex-start",
        },
      })}
    >
      {dataHandler.map((tag) => (
        <TagItem key={tag._id} data={tag} {...rest} />
      ))}
      {extraCount > 0 && (
        <Typography ml="4px" fontWeight={600}>
          {extraCount}+
        </Typography>
      )}
    </Box>
  );
};

export default TagsWrapper;
