import React, { FC, ReactElement } from "react";
import { FieldInputProps } from "formik";
import MuiTextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const placeholders: Record<string, string> = {
  phone: "+...",
  mobile: "+...",
  website: "https://",
};

interface TextFieldProps {
  elementProps: FieldInputProps<any>;
  error: string;
  type?: string;
  readOnly?: boolean;
  hideErrorMessage?: boolean;
}

const TextField: FC<TextFieldProps> = ({
  elementProps,
  error,
  type = "text",
  readOnly,
  hideErrorMessage,
}): ReactElement => {
  return (
    <MuiTextField
      {...elementProps}
      fullWidth
      error={!!error}
      multiline={elementProps.name === "description"}
      rows={4}
      type={type}
      helperText={
        !hideErrorMessage && (
          <Typography color="error" textAlign="right" variant="body2">
            {error}
          </Typography>
        )
      }
      InputProps={{
        readOnly: readOnly,
      }}
      placeholder={(placeholders[elementProps.name] as string) ?? ""}
    />
  );
};

export default TextField;
