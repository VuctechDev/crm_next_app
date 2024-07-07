import { MenuItem, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import React, { FC, ReactElement } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";

const languages = [
  {
    value: "sr",
    label: "SR",
    iso: "rs",
  },
  {
    value: "en",
    label: "EN",
    iso: "gb",
  },
  {
    value: "de",
    label: "DE",
    iso: "de",
  },
];

interface LanguageSelectProps {}

const LanguageSelect: FC<LanguageSelectProps> = (): ReactElement => {
  const { locale, push, asPath } = useRouter();
  return (
    <Box>
      <TextField
        aria-label="Language"
        select
        variant="standard"
        value={locale}
        sx={(t) => ({
          mt: "4px",
          "div, svg": {
            background: "transparent",
          },
          "div:after": {
            border: "none",
          },
          [t.breakpoints.down("md")]: {
            color: "#fff",
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          },
        })}
        SelectProps={{
          onChange: (e) =>
            push(asPath, asPath, { locale: e.target.value as string }),
          MenuProps: { disableScrollLock: true },
          disableUnderline: true,
          IconComponent: KeyboardArrowDownIcon,

          renderValue: (value) => {
            const { iso, label } =
              languages.find((item) => item.value === value) ?? {};
            return (
              <Box
                sx={{ display: "flex", alignItems: "center", columnGap: "6px" }}
              >
                <Image
                  width="24"
                  height="24"
                  alt={iso ?? ""}
                  loading="lazy"
                  src={`https://flagsapi.com/${iso?.toUpperCase()}/shiny/32.png`}
                />
                <Typography
                  variant="button"
                  sx={(t) => ({
                    // [t.breakpoints.down("md")]: {
                    //   color: "#fff",
                    // },
                  })}
                >
                  {label}
                </Typography>
              </Box>
            );
          },
        }}
      >
        {languages.map(({ label, value, iso }) => (
          <MenuItem
            key={label}
            value={value}
            sx={{ display: "flex", alignItems: "center", columnGap: "6px" }}
          >
            <Image
              width="28"
              height="28"
              alt={iso}
              loading="lazy"
              src={`https://flagsapi.com/${iso.toUpperCase()}/shiny/32.png`}
            />
            <Typography variant="button">{label}</Typography>
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default LanguageSelect;
