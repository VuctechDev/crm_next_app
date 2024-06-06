import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import DataLoaderSkeleton from "./DataLoaderSkeleton";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useEffect, useRef } from "react";
import HeaderCell from "./TableHeaderCell";

interface Props {
  data: any[];
  keys: {
    key: string;
    render?: (value: any, data: any, i: number) => any;
    preventClick?: boolean;
  }[];
  headers: { key: string; sort?: boolean }[];
  page?: number;
  pageRows?: number;
  skeletonCount?: number;
  totalCount: number;
  loading: boolean;
  paginationReset: string;
  handlePagination: (query: string) => void;
  handleRowSelect: (id: string) => void;
  hover?: boolean;
}
const TableWrapper: React.FC<Props> = ({
  data,
  keys,
  headers,
  skeletonCount,
  totalCount,
  loading,
  paginationReset,
  handlePagination,
  handleRowSelect,
  hover = true,
}) => {
  const { t } = useTranslation();

  const page = useRef(0);
  const rowsPerPage = useRef(10);

  const handleChange = (type: "page" | "rows", value: number) => {
    if (type === "page") {
      page.current = value;
    } else if (type === "rows") {
      rowsPerPage.current = value;
    }
    handlePagination(`page=${page.current}&limit=${rowsPerPage.current}`);
  };

  useEffect(() => {
    page.current = 0;
    rowsPerPage.current = 10;
  }, [paginationReset]);

  let componentToRender = (
    <TableRow>
      <TableCell align="center" colSpan={headers.length} sx={{ py: 1 }}>
        <DataLoaderSkeleton
          height={32}
          mb={10}
          count={skeletonCount ?? rowsPerPage.current}
        />
      </TableCell>
    </TableRow>
  );

  if (!loading && data.length) {
    componentToRender = (
      <>
        {data.map((item: { [key: string]: string | number }, i) => (
          <TableRow
            hover={hover}
            key={item._id}
            sx={{
              // backgroundColor: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.04)",
              p: "14px",
              marginBottom: "8px",
              "& :hover": {
                cursor: "pointer",
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
                  }}
                >
                  <Typography variant="body1">
                    {render ? render(item[key], item, i) : item[key]}
                  </Typography>{" "}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </>
    );
  } else if (!loading && !data.length) {
    componentToRender = (
      <TableRow>
        <TableCell align="center" colSpan={headers.length} sx={{ py: 3 }}>
          <Typography variant="body1">{t("noResultsFound")}</Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead
          sx={(t) => ({
            backgroundColor:
              t.palette.mode === "dark"
                ? "rgba(256,256,256,0.06)"
                : "rgba(0,0,0,0.04)",
          })}
        >
          <TableRow>
            {headers.map((item) => (
              <HeaderCell key={item.key} data={item} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{componentToRender}</TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={totalCount ?? 0}
        rowsPerPage={rowsPerPage.current}
        page={page.current}
        onPageChange={(a, b) => handleChange("page", b)}
        onRowsPerPageChange={(e) => handleChange("rows", +e.target.value)}
        labelRowsPerPage={t("rowsPerPage")}
      />
    </TableContainer>
  );
};

export default TableWrapper;
