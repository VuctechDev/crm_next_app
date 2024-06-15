import React, { FC, ReactElement } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface SubmitButtonProps {
  loading: boolean;
  label: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  loading,
  label,
}): ReactElement => {
  return (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      type="submit"
      sx={(t) => ({
        mt: "40px",
        "& circle": { color: "rgba(0,0,0,0.9)" },
      })}
    >
      {loading ? <CircularProgress size={22} /> : label}
    </Button>
  );
};

export default SubmitButton;
