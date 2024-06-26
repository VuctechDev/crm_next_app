import React, { FC, useRef } from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTranslation } from "next-i18next";

interface FilterButtonProps {
  value: string;
  data: { label: string; options?: { label: string; value: string }[] };
  handleFilterSelect: (key: string, value: string) => void;
}
const FilterButton: FC<FilterButtonProps> = ({
  value,
  data,
  handleFilterSelect,
}) => {
  const { t } = useTranslation();

  const { label, options } = data;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIconClick = (event: any) => {
    event.stopPropagation();
    if (value) {
      handleFilterSelect(label, "");
    }
  };

  const handleFilterApply = () => {
    handleFilterSelect(label, inputRef?.current?.value ?? "");
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const selectValue = data.label === "tags" || data.label === "status";
  const displayValue =
    selectValue && data?.options
      ? data?.options.find((x) => x.value === value)?.label
      : value;

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        color="error"
        sx={(t) => ({
          p: "2px 12px 2px 2px",
          borderColor: t.palette.text.secondary,
          color: t.palette.text.secondary,
          borderWidth: "1px",
          "&:hover": {
            borderColor: t.palette.text.secondary,
            color: t.palette.text.secondary,
            backgroundColor:
              t.palette.mode === "dark"
                ? "rgba(256, 256,256,0.1)"
                : "rgba(0, 0,0,0.1)",
          },
        })}
      >
        <IconButton
          disableRipple
          onClick={handleIconClick}
          size="small"
          sx={(t) => ({ mr: "4px", color: t.palette.text.secondary })}
        >
          {value ? (
            <HighlightOffIcon fontSize="small" />
          ) : (
            <AddCircleOutlineOutlinedIcon fontSize="small" />
          )}
        </IconButton>
        <Typography
          sx={(t) => ({
            "& span": {
              color: t.palette.info.main,
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "none",
            },
          })}
        >
          {t(label)}
          {value ? ": " : ""}
          <span>{displayValue}</span>
        </Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={1}
        sx={{}}
        disableScrollLock
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: { borderRadius: "8px", mt: "10px" },
          },
        }}
      >
        <Box sx={{ p: "20px", width: "220px" }}>
          <Typography>
            {t("filterBy")} {t(label)}
          </Typography>
          <TextField
            inputRef={inputRef}
            name={label}
            defaultValue={value}
            sx={{
              borderRadius: "20px",
              fontSize: "14px",
              my: "14px",
              // width: "200px",
            }}
            fullWidth
            variant="outlined"
            select={label === "status" || label === "tags"}
            InputProps={{
              sx: { borderRadius: "8px", padding: "0px 14px" },
              inputProps: {
                style: { padding: "10px 0px" },
              },
            }}
          >
            {options?.map((x) => (
              <MenuItem key={x.label} value={x.value}>
                <Typography>{t(x.label)}</Typography>
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={handleFilterApply} variant="contained">
            {t("apply")}
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default FilterButton;
