import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { TagType } from "@/db/tags";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

interface TagItemProps {
  data: TagType;
  small?: boolean;
  mr?: string;
}

const TagItem: FC<TagItemProps> = ({ data, small, mr }): ReactElement => {
  const { tag, color, description } = data;
  return (
    <Tooltip title={description}>
      <Box
        sx={{
          height: "30px",
          borderRadius: "8px",
          backgroundColor: color,
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: small ? "2px 3px" : "6px 8px",
          mr,
        }}
      >
        <Typography
          color="#fff"
          fontSize={small ? "12px" : ""}
          fontWeight={500}
        >
          {tag}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default TagItem;
