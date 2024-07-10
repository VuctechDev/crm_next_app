import React, { FC, ReactElement } from "react";
import Button, { ButtonProps as BaseProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material";

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
  ...rest
}): ReactElement => {
  const theme = useTheme();
  const a = sx ? { ...sx } : {};
  return (
    <Button
      fullWidth
      {...rest}
      onClick={onClick}
      disabled={loading || disabled}
      variant="contained"
      type={type}
      sx={{
        mt: "40px",
        ...a,
        "& circle": { color: "rgba(0,0,0,0.9)" },
        [theme.breakpoints.down("sm")]: {
          mt: "30px",
        },
      }}
    >
      {loading ? <CircularProgress size={22} /> : label}
    </Button>
  );
};

export default SubmitButton;
