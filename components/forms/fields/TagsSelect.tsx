import React, { FC, ReactElement, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { FieldInputProps } from "formik";
import { useGetTags, useGetPaginatedTags } from "@/lib/client/api/tags/queries";
import useDebounce from "@/hooks/useDebounce";
import { TagType } from "@/db/tags";
import FieldLabel from "./FieldLabel";
import { storage } from "@/lib/client/storage";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import TagItem from "@/components/tags/TagItem";

interface TagsSelectProps {
  elementProps?: FieldInputProps<any>;
  error?: string;
  onChange?: (a: any) => void;
}

const TagsSelect: FC<TagsSelectProps> = ({
  elementProps,
  error,
  onChange,
}): ReactElement => {
  const [search, setSearch] = useState("");
  const [savedTags] = useState(storage.get<number[]>("savedTags"));

  // const debouncedValue = useDebounce(search, 500);
  const { data, isLoading } = useGetTags();
  // const { data, isLoading } = useGetPaginatedTags(
  //   `page=0&limit=6&search=${debouncedValue}`
  // );

  useEffect(() => {
    if (savedTags && onChange) {
      onChange(
        data?.data
          .filter((tag) => savedTags?.includes(tag._id))
          .map((x) => x._id)
      );
    }
  }, [savedTags]);

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  let options = data?.data ?? [];
  if (elementProps?.value?.length) {
    options =
      data?.data.filter(
        (item) =>
          !elementProps?.value.find(
            (initialTag: TagType) => initialTag._id === item._id
          )
      ) ?? [];
  }

  const handleSelect = (value: TagType[]) => {
    if (onChange) {
      const ids = value.map((x) => x._id);
      onChange(ids);
      localStorage.setItem("savedTags", JSON.stringify(ids));
    } else if (elementProps) {
      elementProps.onChange({
        target: { value, name: "tags" },
      });
    }
  };

  const params = elementProps ?? {
    defaultValue: data?.data.filter((tag) => savedTags?.includes(tag._id)),
  };

  return (
    <Box width={1} sx={onChange ? { width: "520px", mb: "40px" } : {}}>
      {onChange && <FieldLabel label="tags" />}
      <Autocomplete
        {...params}
        multiple
        fullWidth
        id="tags-outlined"
        options={options}
        getOptionLabel={(option) => option.tag}
        onChange={(e, data) => handleSelect(data)}
        noOptionsText={isLoading ? "Loading" : "No Options"}
        filterSelectedOptions
        renderTags={(data) =>
          data.map((tag) => <TagItem key={tag._id} data={tag} mr="8px" />)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => setSearch(e.target.value)}
            error={!!error}
            helperText={
              <Typography color="error" textAlign="right" variant="body2">
                {error ?? ""}
              </Typography>
            }
          />
        )}
      />
    </Box>
  );
};

export default TagsSelect;
