import React, { FC, useRef } from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Button, TextField, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface FilterButtonProps {
  label: string;
  value: string;
  handleFilterSelect: (key: string, value: string) => void;
}
const FilterButton: FC<FilterButtonProps> = ({
  label,
  value,
  handleFilterSelect,
}) => {
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
          {label}
          {value ? ":" : ""}
          <span>{value ? ` ${value}` : ""}</span>
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
        <Box sx={{ p: "20px" }}>
          <Typography>Filter by {label}</Typography>
          <TextField
            inputRef={inputRef}
            name={label}
            defaultValue={value}
            sx={{ borderRadius: "20px", fontSize: "14px", my: "14px" }}
            fullWidth
            variant="outlined"
            InputProps={{
              sx: { borderRadius: "8px", padding: "0px 14px" },
              inputProps: {
                style: { padding: "10px 0px" },
              },
            }}
          />
          <Button onClick={handleFilterApply} variant="contained">
            Apply
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default FilterButton;
