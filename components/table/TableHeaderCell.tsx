import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

interface HeaderCellProps {
  data: { key: string; sort?: boolean };
}

const HeaderCell: FC<HeaderCellProps> = ({ data }): ReactElement => {
  const { t } = useTranslation();

  return (
    <TableCell align="right">
      <Typography
        sx={{
          cursor: data.sort ? "pointer" : "unset",
          //   color: data.sort ? "red" : "unset",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        fontWeight={500}
      >
        {t(data.key)}
        {data.sort && <ArrowDownwardIcon sx={{ ml: "8px" }} fontSize="small" />}
      </Typography>
    </TableCell>
  );
};

export default HeaderCell;
