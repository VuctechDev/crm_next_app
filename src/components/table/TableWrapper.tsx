import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import DataLoaderSkeleton from "./DataLoaderSkeleton";
import Typography from "@mui/material/Typography";
// import { useTranslation } from "react-i18next";

interface Props {
  data: any[];
  keys: {
    key: string;
    render?: (value: any, data: any, i: number) => any;
    preventClick?: boolean;
  }[];
  headers: string[];
  page: number;
  pageRows: number;
  skeletonCount?: number;
  totalCount: number;
  loading: boolean;
  handlePagination: (page: number, pageRows: number) => void;
  handleRowSelect: (id: string) => void;
  hover?: boolean;
}
const TableWrapper: React.FC<Props> = ({
  data,
  keys,
  headers,
  page,
  pageRows,
  skeletonCount,
  totalCount,
  loading,
  handlePagination,
  handleRowSelect,
  hover = true,
}) => {
  // const { t } = useTranslation();
  const t = (k: string) => k;
  let componentToRender = (
    <TableRow>
      <TableCell align="center" colSpan={headers.length} sx={{ py: 1 }}>
        <DataLoaderSkeleton
          height={35}
          mb={10}
          count={skeletonCount ?? pageRows}
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
              backgroundColor: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.04)",
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
          sx={{
            backgroundColor: "rgba(0,0,0,0.04)",
          }}
          
        >
          <TableRow>
            {headers.map((item) => (
              <TableCell key={item} align="right">
                <Typography variant="h5">{t(item)}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{componentToRender}</TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={totalCount ?? 0}
        rowsPerPage={pageRows}
        page={page}
        onPageChange={(a, b) => handlePagination(b, pageRows)}
        onRowsPerPageChange={(e) => handlePagination(page, +e.target.value)}
        labelRowsPerPage={t("rowsPerPage")}
      />
    </TableContainer>
  );
};

export default TableWrapper;
