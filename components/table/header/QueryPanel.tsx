import React, { FC, ReactElement, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FilterButton from "./FilterButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "@/hooks/useDebounce";
import { useTranslation } from "next-i18next";

interface QueryPanelProps {
  keys: {
    label: string;
    initialValue?: string;
    options?: { label: string; value: string }[];
  }[];
  handleQueriesChange: (query: string) => void;
}

const handleTableQuery = (filters: Record<string, string>): string => {
  let query = "";
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return query;
};

const QueryPanel: FC<QueryPanelProps> = ({
  keys,
  handleQueriesChange,
}): ReactElement => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>(
    [...keys, { label: "search" }].reduce(
      (acc: Record<string, string>, key) => {
        acc[key.label] = key.initialValue ?? "";
        return acc;
      },
      {}
    )
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
          key={key.label}
          data={key}
          value={filters[key.label]}
          handleFilterSelect={handleFilters}
        />
      ))}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: keys.length ? "flex-end" : "flex-start",
        }}
      >
        <TextField
          sx={{ borderRadius: "20px", fontSize: "14px", maxWidth: "300px" }}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          name="search"
          variant="outlined"
          placeholder={t("search...")}
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
