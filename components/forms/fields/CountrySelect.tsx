import React, { FC, ReactElement } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { FieldInputProps, useFormikContext } from "formik";
import { countries } from "@/lib/shared/consts/countries";

interface CountrySelectProps {
  elementProps: FieldInputProps<any>;
  error?: string;
}

const CountrySelect: FC<CountrySelectProps> = ({
  elementProps,
  error,
}): ReactElement => {
  const { t } = useTranslation();
  const { setFieldValue } = useFormikContext();

  return (
    <Autocomplete
      fullWidth
      id="country-select"
      options={countries}
      componentsProps={{
        popper: { sx: { maxHeight: "30px" } },
        paper: { sx: { maxHeight: "200px" } },
      }}
      onChange={(e, data) => setFieldValue("country", data)}
      renderOption={(props, item) => (
        <li
          {...props}
          key={item.name}
          style={{ display: "flex", alignItems: "center", columnGap: "10px" }}
        >
          <Image
            width="32"
            height="32"
            alt={item?.iso3}
            loading="lazy"
            src={`https://flagsapi.com/${item.iso.toUpperCase()}/shiny/32.png`}
          />
          <Typography>{item.name}</Typography>
        </li>
      )}
      getOptionLabel={(option: any) => `${t(option.name)}`}
      renderInput={(params: any) => (
        <TextField
          {...elementProps}
          {...params}
          error={!!error}
          helperText={
            <Typography color="error" textAlign="right" variant="body2">
              {error ?? ""}
            </Typography>
          }
        />
      )}
      noOptionsText={t("noResultsFound")}
    />
  );
};

export default CountrySelect;
