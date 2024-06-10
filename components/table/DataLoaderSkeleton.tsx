import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import React, { FC, ReactElement } from "react";

interface DataLoaderSkeletonProps {
  height?: number;
  mb?: number;
  count?: number;
}

const DataLoaderSkeleton: FC<DataLoaderSkeletonProps> = ({
  height = 3,
  mb = 8,
  count = 10,
}): ReactElement => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((x, i) => (
          <Box
            key={i}
            mb={`${mb}px`}
            mt={!i ? "14px" : "0px"}
            width={1}
            pb="10px"
          >
            <Skeleton
              variant="rounded"
              animation="wave"
              width="100%"
              height={height}
            />
          </Box>
        ))}
    </>
  );
};

export default DataLoaderSkeleton;
