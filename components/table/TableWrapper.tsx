import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";
import HeaderCell from "./TableHeaderCell";
import QueryPanel from "./header/QueryPanel";
import * as TableBodyState from "./TableBody";

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
  handleQueryChange: (query: string) => void;
  handleRowSelect: (id: string) => void;
  hover?: boolean;
  filterKeys?: { label: string; options?: { label: string; value: string }[] }[];
}
const TableWrapper: React.FC<Props> = ({
  data,
  keys,
  headers,
  skeletonCount,
  totalCount,
  loading,
  handleQueryChange,
  handleRowSelect,
  hover = true,
  filterKeys,
}) => {
  const { t } = useTranslation();
  const [filterQuery, setFilterQuery] = useState("");
  const [paginationQuery, setPaginationQuery] = useState("page=0&limit=10");

  const page = useRef(0);
  const rowsPerPage = useRef(10);

  const handleChange = (type: "page" | "rows", value: number) => {
    if (type === "page") {
      page.current = value;
    } else if (type === "rows") {
      rowsPerPage.current = value;
    }
    setPaginationQuery(`page=${page.current}&limit=${rowsPerPage.current}`);
  };

  const handleFilters = (query: string) => {
    setFilterQuery(query);
    page.current = 0;
    setPaginationQuery(`page=0&limit=${rowsPerPage.current}`);
  };

  useEffect(() => {
    handleQueryChange(`${paginationQuery}${filterQuery}`);
  }, [filterQuery, paginationQuery]);

  let componentToRender = (
    <TableBodyState.Loading
      colSpan={headers?.length}
      skeletonCount={skeletonCount ?? rowsPerPage.current}
    />
  );

  if (!loading && data.length) {
    componentToRender = (
      <TableBodyState.Content
        data={data}
        hover={hover}
        keys={keys}
        handleRowSelect={handleRowSelect}
      />
    );
  } else if (!loading && !data.length) {
    componentToRender = <TableBodyState.Empty colSpan={headers?.length} />;
  }

  return (
    <>
      {filterKeys && (
        <QueryPanel keys={filterKeys} handleQueriesChange={handleFilters} />
      )}
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
    </>
  );
};

export default TableWrapper;
