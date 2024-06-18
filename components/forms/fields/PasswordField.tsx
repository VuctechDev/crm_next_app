import React, { FC, ReactElement, useState } from "react";
import TextField from "./TextField";
import { useFormikContext } from "formik";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Grid from "@mui/material/Grid";
import PasswordStrength from "./PasswordStrength";
import FieldLabel from "./FieldLabel";

interface PasswordFieldProps {
  withConfirmation?: boolean;
  error: string;
  confirmError?: string;
}

const PasswordField: FC<PasswordFieldProps> = ({
  withConfirmation,
  error,
  confirmError,
}): ReactElement => {
  const [type, setType] = useState("password");
  const { getFieldProps } = useFormikContext<any>();

  const handleType = () => setType(type === "password" ? "text" : "password");
  return (
    <>
      <Grid item xs={12} sx={{ position: "relative" }}>
        <FieldLabel label="password" />
        <TextField
          elementProps={{ ...getFieldProps("password") }}
          error={error}
          type={type}
          hideErrorMessage={withConfirmation}
        />
        {type === "password" ? (
          <VisibilityOutlinedIcon
            onClick={handleType}
            sx={(t) => ({
              color: t.palette.text.secondary,
              position: "absolute",
              right: 10,
              top: 35,
              cursor: "pointer",
            })}
          />
        ) : (
          <VisibilityOffOutlinedIcon
            onClick={handleType}
            sx={(t) => ({
              color: t.palette.text.secondary,
              position: "absolute",
              right: 10,
              top: 35,
              cursor: "pointer",
            })}
          />
        )}
        {withConfirmation && <PasswordStrength />}
      </Grid>
      {withConfirmation && (
        <Grid width={1} item xs={12}>
          <FieldLabel label="confirmPassword" />
          <TextField
            elementProps={{ ...getFieldProps("confirmPassword") }}
            error={confirmError as string}
            type={type}
          />
        </Grid>
      )}
    </>
  );
};

export default PasswordField;
