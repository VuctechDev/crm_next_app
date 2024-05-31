import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import FilterButton from "./FilterButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { handleTableQuery } from "@/lib/client/handleTableQuery";
import useDebounce from "@/hooks/useDebounce";

interface QueryPanelProps {
  keys: string[];
  handleQueriesChange: (query: string) => void;
}

const QueryPanel: FC<QueryPanelProps> = ({
  keys,
  handleQueriesChange,
}): ReactElement => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>(
    [...keys, "search"].reduce((acc: Record<string, string>, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );

  const handleFilters = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const debouncedValue = useDebounce(search, 1000);

  useEffect(() => {
    const query = handleTableQuery(filters);
    handleQueriesChange(query);
  }, [filters]);

  useEffect(() => {
    handleFilters("search", debouncedValue);
  }, [debouncedValue]);

  return (
    <Box
      sx={{
        height: "100px",
        display: "flex",
        alignItems: "center",
        columnGap: "20px",
        px: "20px",
      }}
    >
      {keys.map((key) => (
        <FilterButton
          key={key}
          label={key}
          value={filters[key]}
          handleFilterSelect={handleFilters}
        />
      ))}
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
        <TextField
          sx={{ borderRadius: "20px", fontSize: "14px", maxWidth: "300px" }}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          name="search"
          variant="outlined"
          placeholder="Search..."
          InputProps={{
            sx: { borderRadius: "20px", padding: "0px 14px" },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            inputProps: {
              style: { padding: "10px 0px" },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default QueryPanel;