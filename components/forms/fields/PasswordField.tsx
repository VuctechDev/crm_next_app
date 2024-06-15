import React, { FC, ReactElement, useState } from "react";
import TextField from "./TextField";
import { useFormikContext } from "formik";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PasswordStrength from "./PasswordStrength";

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
  const { t } = useTranslation();
  const [type, setType] = useState("password");
  const { getFieldProps } = useFormikContext<any>();

  const handleType = () => setType(type === "password" ? "text" : "password");
  return (
    <>
      <Grid item xs={12} sx={{ position: "relative" }}>
        <Typography
          variant="body2"
          sx={{
            mb: "6px",
          }}
        >
          {t("password")}
        </Typography>
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
          <Typography
            variant="body2"
            sx={{
              mb: "6px",
            }}
          >
            {t("confirmPassword")}
          </Typography>
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
