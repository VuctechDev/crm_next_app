import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";

interface LoadingSkeletonProps {}

const LoadingSkeleton: FC<LoadingSkeletonProps> = (): ReactElement => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((x, i) => (
          <Box key={i} width={1} sx={{ mb: "28px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: "8px",
              }}
            >
              <Skeleton width="120px" />
              <Skeleton width="120px" />
            </Box>

            <Skeleton />
          </Box>
        ))}
    </>
  );
};

export default LoadingSkeleton;
