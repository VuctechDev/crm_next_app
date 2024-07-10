import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { FieldInputProps, useFormikContext } from "formik";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import { useGetEmailTemplates } from "@/lib/client/api/email/templates/queries";
import { EmailTemplateType } from "@/db/emails/templates";
import { useGetEmailSignature } from "@/lib/client/api/email/signature/queries";

interface TemplateSelectProps {
  elementProps: FieldInputProps<any>;
  error: string;
}

const TemplateSelect: FC<TemplateSelectProps> = ({
  elementProps,
  error,
}): ReactElement => {
  const { setFieldValue } = useFormikContext<{
    template: string;
    body: string;
  }>();

  const { data: signature } = useGetEmailSignature();
  const { data, isLoading } = useGetEmailTemplates();

  if (isLoading) {
    return <LoadingOverlayer />;
  }

  const handleSelect = (value: EmailTemplateType) => {
    if (value) {
      const body = `${value?.body}<p><br/></p> <p><br/></p> ${signature?.body}`;
      setFieldValue("body", body);
    } else {
      const body = `<p><br/></p> <p><br/></p> ${signature?.body}`;
      setFieldValue("body", body);
    }
    elementProps?.onChange({
      target: { value, name: "template" },
    });
  };

  return (
    <Box width={1}>
      <Autocomplete
        {...elementProps}
        fullWidth
        id="tags-outlined"
        options={data?.data ?? []}
        getOptionLabel={(option) => option.name ?? ""}
        onChange={(e, data) => handleSelect(data)}
        noOptionsText={isLoading ? "Loading" : "No Options"}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!error}
            helperText={
              <Typography color="error" textAlign="right" variant="body2">
                {error ?? ""}
              </Typography>
            }
          />
        )}
      />
    </Box>
  );
};

export default TemplateSelect;
