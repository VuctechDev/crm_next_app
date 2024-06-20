import React, { FC, ReactElement } from "react";
import Button, { ButtonProps as BaseProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps, Theme } from "@mui/system";

type SubmitButtonProps = BaseProps & {
  loading: boolean;
  label: string;
};

const SubmitButton: FC<SubmitButtonProps> = ({
  loading,
  label,
  disabled,
  type = "submit",
  onClick,
  sx,
}): ReactElement => {
  const a = sx ? { ...sx } : {};
  return (
    <Button
      fullWidth
      onClick={onClick}
      disabled={loading || disabled}
      variant="contained"
      type={type}
      sx={{
        mt: "40px",
        ...a,
        "& circle": { color: "rgba(0,0,0,0.9)" },
      }}
    >
      {loading ? <CircularProgress size={22} /> : label}
    </Button>
  );
};

export default SubmitButton;
