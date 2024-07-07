import React, { FC, ReactElement } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DataLoaderSkeleton from "./DataLoaderSkeleton";
import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";

interface LoadingProps {
  colSpan: number;
  skeletonCount?: number;
}

const Loading: FC<LoadingProps> = ({
  colSpan,
  skeletonCount = 10,
}): ReactElement => {
  return (
    <TableRow>
      <TableCell align="center" colSpan={colSpan} sx={{ py: 1 }}>
        <DataLoaderSkeleton height={32} mb={10} count={skeletonCount} />
      </TableCell>
    </TableRow>
  );
};

interface EmptyProps {
  colSpan: number;
}

const Empty: FC<EmptyProps> = ({ colSpan }): ReactElement => {
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell align="center" colSpan={colSpan} sx={{ py: 3 }}>
        <Typography>{t("noResultsFound")}</Typography>
      </TableCell>
    </TableRow>
  );
};

interface ContentProps {
  data: any[];
  hover?: boolean;
  keys: {
    key: string;
    render?: (value: any, data: any, i: number) => any;
    preventClick?: boolean;
  }[];
  handleRowSelect: (id: string) => void;
}

const Content: FC<ContentProps> = ({
  data,
  keys,
  hover,
  handleRowSelect,
}): ReactElement => {
  return (
    <>
      {data.map((item: { [key: string]: string | number }, i) => (
        <TableRow
          hover={hover}
          key={item._id}
          sx={{
            p: "14px",
            marginBottom: "8px",
            "& :hover": {
              cursor: hover
                ? {
                    cursor: "pointer",
                  }
                : {},
            },
          }}
        >
          {keys.map(({ key, preventClick, render }) => {
            return (
              <TableCell
                onClick={(e) => {
                  if (!preventClick) {
                    handleRowSelect(item._id as string);
                  }
                }}
                key={key}
                align="right"
                sx={{
                  fontSize: 14,
                  py: "10px",
                  // display: "flex",
                  // justifyContent: "flex-end"
                }}
              >
                {/* <Typography variant="body1"> */}
                {render ? (
                  render(item[key], item, i)
                ) : (
                  <Typography variant="body1">{item[key]}</Typography>
                )}
                {/* </Typography>{" "} */}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
};

export { Loading, Empty, Content };
